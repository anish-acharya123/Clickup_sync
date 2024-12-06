const { default: axios } = require("axios");
const User = require("../models/userModel");
const TaskMap = require("../models/TaskRepoMapModel");
const { getClickupData } = require("../utils/getClickupUserinfo");

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

const createGitHubIssue = async (req, res) => {
  const { taskId, repoName } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user || !user.clickupToken) {
      return res.status(404).json({ message: "ClickUp token not found" });
    }
    // Fetch task details from ClickUp
    const taskDetails = await getClickupData(
      `/task/${taskId}`,
      user.clickupToken
    );

    // console.log(taskDetails);
    const { name, description, status } = taskDetails;

    console.log(name, description, status);
    // Create GitHub issue

    console.log(repoName);
    console.log("GitHub Request:", {
      repoName,
      headers: { Authorization: `Bearer ${user.githubToken}` },
      data: {
        title: name,
        body: `### ClickUp Task: [${taskId}]\n${
          description || "No description provided."
        }`,
        labels: [status.status || "No Status"],
      },
    });

    try {
      const githubResponse = await axios.post(
        `https://api.github.com/repos/${user.githubName}/${repoName}/issues`,
        {
          title: name,
          body: `### ClickUp Task: [${taskId}]\n${
            description || "No description provided."
          }`,
          labels: [status.status || "No Status"],
        },
        { headers: { Authorization: `Bearer ${user.githubToken}` } }
      );
      console.log("GitHub Response:", githubResponse.data);
    } catch (error) {
      console.error("GitHub API Error:", error.response?.data || error.message);
      throw error;
    }

    console.log(githubResponse, "gitubresfsf");
    // Update DB with GitHub issue number
    await TaskMap.findOneAndUpdate(
      { taskId },
      { githubIssueNumber: githubResponse.data.number }
    );

    res.status(200).json({ message: "GitHub issue created", githubResponse });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create GitHub issue", details: error });
  }
};

module.exports = { Fetchrepos, createGitHubIssue };
