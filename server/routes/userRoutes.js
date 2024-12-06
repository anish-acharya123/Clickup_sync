const express = require("express");
const verifyJWT = require("../utils/verifyJWT");
const { GetuserInfo } = require("../controller/userController");
const { Workspace_task } = require("../controller/wokspaceController");

const router = express.Router();

//clickup fetch
router.get("/info", verifyJWT, GetuserInfo);
router.get("/workspace-tasks", verifyJWT, Workspace_task);

module.exports = router;
