const User = require("../models/userModel");
const { getClickupData } = require("../utils/getClickupUserinfo");

const Workspace_task = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user || !user.clickupToken) {
      return res.status(404).json({ message: "ClickUp token not found" });
    }

    // API Request to ClickUp for workspaces
    const workspacesResponse = await getClickupData("/team", user.clickupToken);
    // console.log(workspacesResponse, "workspaceresopnse");

    const workspaces = workspacesResponse.teams;
    const workspaceId = workspaces[0].id;
    // console.log(workspaceId);

    const tasksResponse = await getClickupData(
      `/team/${workspaceId}/task`,
      user.clickupToken
    );

    // console.log(tasksResponse.tasks, "anish");
    const tasks = tasksResponse.tasks;
    res.status(200).json({ workspaces, tasks });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error: error });
  }
};

module.exports = { Workspace_task };
