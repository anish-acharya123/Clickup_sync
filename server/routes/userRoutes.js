const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const { GetuserInfo, validateUser } = require("../controller/userController");
const { Workspace_task } = require("../controller/wokspaceController");
const {
  FetchEachTask,
  mapTaskToRepo,
} = require("../controller/TaskController");
const {
  Fetchrepos,
  createGitHubIssue,
} = require("../controller/githubController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

//clickup fetch
router.get("/info", verifyJWT, GetuserInfo);
router.get("/workspace-tasks", verifyJWT, Workspace_task);
router.get("/task/:taskId", verifyJWT, FetchEachTask);

// github fetch
router.get("/github-repos", verifyJWT, Fetchrepos);
router.post("/task/map-repo", mapTaskToRepo);
router.post("/task/create-github-issue", verifyJWT, createGitHubIssue);

//authorization
router.get("/validate", authMiddleware, validateUser);

module.exports = router;
