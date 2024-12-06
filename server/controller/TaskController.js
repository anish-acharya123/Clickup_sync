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

module.exports = { FetchEachTask, mapTaskToRepo };
