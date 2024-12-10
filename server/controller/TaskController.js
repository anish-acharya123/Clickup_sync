const WorkspaceRepoMap = require("../models/TaskRepoMapModel");
const TaskMap = require("../models/TaskRepoMapModel");
const User = require("../models/userModel");
const { getClickupData } = require("../utils/getClickupUserinfo");

const FetchEachTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user || !user.clickupToken) {
      return res.status(404).json({ message: "ClickUp token not found" });
    }

    const taskDetails = await getClickupData(
      `/task/${taskId}`,
      user.clickupToken
    );

    res.status(200).json(taskDetails);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "failed to fetch each task details", error: error });
  }
};

const mapTaskToRepo = async (req, res) => {
  const { taskId, repoName } = req.body;

  try {
    // Save the mapping to MongoDB
    const mapping = await TaskMap.findOneAndUpdate(
      { taskId },
      { repoName },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: "Task mapped successfully", mapping });
  } catch (error) {
    res.status(500).json({ error: "Failed to map task to repository" });
  }
};

const mapWorkspaceToRepo = async (req, res) => {
  const { workspaceId, repoName } = req.body;
  const user = req.user;

  // Validate input
  if (!workspaceId || !repoName) {
    return res
      .status(400)
      .json({ error: "Workspace ID and repository name are required." });
  }

  try {
    // Check if the mapping already exists
    const existingMapping = await WorkspaceRepoMap.findOne({ workspaceId });

    if (existingMapping && existingMapping.repoName === repoName) {
      return res.status(200).json({
        message: "Workspace is already mapped to this repository.",
      });
    }

    // Update or create a new mapping
    const updatedMapping = await WorkspaceRepoMap.findOneAndUpdate(
      { workspaceId }, // Search condition
      { repoName, assignedBy: user.email }, // Update data
      { upsert: true, new: true } // Options: Create if not exists
    );

    console.log("success");
    res.status(200).json({
      message: "Workspace mapped to repository successfully.",
      data: updatedMapping,
    });
  } catch (error) {
    console.error("Error mapping workspace to repository:", error.message);
    res.status(500).json({
      error: "Failed to map workspace to repository.",
      details: error.message,
    });
  }
};

const getWorkspaceDetails = async (req, res) => {
  const { workspaceId } = req.params;
  const user = req.user;
  // console.log(workspaceId, user);
  try {
    // Fetch the workspace details from ClickUp
    const workspaceDetails = await getClickupData(
      `/team/${workspaceId}`,
      user.clickupToken
    );
    console.log(workspaceDetails);

    if (!workspaceDetails) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    // console.log(workspaceDetails);
    // Fetch the mapped GitHub repository for the workspace
    const mapping = await WorkspaceRepoMap.findOne({ workspaceId });

    console.log(`team/${workspaceId}/task`);
    console.log(workspaceDetails.name);

    // Fetch the tasks count for this workspace
    const taskDetails = await getClickupData(
      `/team/${workspaceId}/task`,
      user.clickupToken
    );
    // console.log(taskDetails);
    const taskCount = taskDetails.tasks.length;

    res.status(200).json({
      workspaceName: workspaceDetails.team.name,
      workspaceId: workspaceId,
      mappedRepo: mapping ? mapping.repoName : "",
      taskCount: taskCount,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch workspace details.",
      details: error.message,
    });
  }
};

module.exports = {
  FetchEachTask,
  mapTaskToRepo,
  mapWorkspaceToRepo,
  getWorkspaceDetails,
};
