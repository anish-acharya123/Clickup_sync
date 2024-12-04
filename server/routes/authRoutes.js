const express = require("express");
const { LoginAccount, ClickupCallback, GithubCallback } = require("../controller/authController");
const router = express.Router();

router.get("/login", LoginAccount);
router.get("/callback/clickup", ClickupCallback);
router.get("/callback/github", GithubCallback);

module.exports = router;
