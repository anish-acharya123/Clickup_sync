const mongoose = require("mongoose");

// const TaskMapSchema = new mongoose.Schema({
//   taskId: { type: String, required: true, unique: true },
//   repoName: { type: String },
//   githubIssueNumber: { type: Number, default: null },
// });

// const TaskMap = mongoose.model("TaskMap", TaskMapSchema);

// module.exports = TaskMap;

const WorkspaceRepoMapping = new mongoose.Schema({
  repoName: { type: String },
  workspaceId: { type: Number, required: true, unique: true },
  assignedBy: { type: String },
});

const WorkspaceRepoMap = mongoose.model(
  "workspaceRepoMapping",
  WorkspaceRepoMapping
);
module.exports = WorkspaceRepoMap;
