const mongoose = require("mongoose");

const TaskMapSchema = new mongoose.Schema({
  taskId: { type: String, required: true, unique: true },
  repoName: { type: String },
  githubIssueNumber: { type: Number, default: null },
});

const TaskMap = mongoose.model("TaskMap", TaskMapSchema);

module.exports = TaskMap;
