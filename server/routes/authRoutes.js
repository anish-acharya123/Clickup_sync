const express = require("express");
const { LoginAccount, ClickupCallbackk } = require("../controller/authController");
const router = express.Router();

router.get("/login", LoginAccount);
router.get("/callback/clickup", ClickupCallbackk);

module.exports = router;
