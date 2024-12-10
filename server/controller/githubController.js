const { default: axios } = require("axios");
const User = require("../models/userModel");
const TaskMap = require("../models/TaskRepoMapModel");
const { getClickupData } = require("../utils/getClickupUserinfo");
const WorkspaceRepoMap = require("../models/TaskRepoMapModel");

const Fetchrepos = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user || !user.githubToken) {
      return res.status(404).json({ message: "GitHub token not found" });
    }

    const response = await axios.get("https://api.github.com/user/repos", {
      headers: { Authorization: `Bearer ${user.githubToken}` },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching github repos", error });
  }
};

// const createGitHubIssue = async (req, res) => {
//   const { taskId, repoName } = req.body;
//   console.log(req.body);
//   const user = req.user;

//   try {
//     // Fetch task details from ClickUp
//     const taskDetails = await getClickupData(
//       `/task/${taskId}`,
//       user.clickupToken
//     );

//     // console.log(taskDetails);
//     const { name, description, status } = taskDetails;

//     console.log(name, description, status);
//     // Create GitHub issue

//     // console.log(repoName);
//     // console.log("GitHub Request:", {
//     //   repoName,
//     //   headers: { Authorization: `Bearer ${user.githubToken}` },
//     //   data: {
//     //     title: name,
//     //     body: `### ClickUp Task: [${taskId}]\n${
//     //       description || "No description provided."
//     //     }`,
//     //     labels: [status.status || "No Status"],
//     //   },
//     // });

//     try {
//       const githubResponse = await axios.post(
//         `https://api.github.com/repos/${user.githubName}/${repoName}/issues`,
//         {
//           title: name,
//           body: `### ClickUp Task: [${taskId}]\n${
//             description || "No description provided."
//           }`,
//           labels: [status.status || "No Status"],
//         },
//         { headers: { Authorization: `Bearer ${user.githubToken}` } }
//       );
//       console.log("GitHub Response:", githubResponse.data);
//     } catch (error) {
//       console.error("GitHub API Error:", error.response?.data || error.message);
//       throw error;
//     }

//     console.log(githubResponse, "gitubresfsf");
//     // Update DB with GitHub issue number
//     await TaskMap.findOneAndUpdate(
//       { taskId },
//       { githubIssueNumber: githubResponse.data.number }
//     );

//     res.status(200).json({ message: "GitHub issue created", githubResponse });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to create GitHub issue", details: error });
//   }
// };

const assignWorkspaceTasksToRepo = async (req, res) => {
  const { workspaceId, repoName } = req.body;
  const user = req.user;

  try {
    // Fetch all tasks for the given workspace
    const workspaceTasks = await getClickupData(
      `/team/${workspaceId}/task`,
      user.clickupToken
    );

    // console.log(workspaceTasks);
    if (!workspaceTasks || workspaceTasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found for the given workspace." });
    }

    // Iterate over each task and create a GitHub issue
    const issueResults = [];
    for (const task of workspaceTasks.tasks) {
      try {
        const { name, description, status, id: taskId } = task;

        // console.log(name, description, taskId, status);
        // Create a GitHub issue
        const githubResponse = await axios.post(
          `https://api.github.com/repos/${user.githubName}/${repoName}/issues`,
          {
            title: name,
            body: `### ClickUp Task: [${taskId}]\n${
              description || "No description provided."
            }`,
            labels: [status?.status || "No status"],
          },
          {
            headers: {
              Authorization: `Bearer ${user.githubToken}`,
            },
          }
        );

        console.log(githubResponse, "githubresponse");
        issueResults.push({
          taskId,
          githubIssue: githubResponse.data,
          success: true,
        });
      } catch (error) {
        issueResults.push({
          taskId: task.id,
          success: false,
          error: error.message,
        });
      }
    }

    console.log(issueResults);
    res.status(200).json({
      message: "GitHub issues created for workspace tasks",
      results: issueResults,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to assign tasks to GitHub repo.",
      details: error,
    });
  }
};

module.exports = { Fetchrepos, assignWorkspaceTasksToRepo };
