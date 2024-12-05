const express = require("express");
const { GetuserInfo } = require("../controller/userController");
const verifyJWT = require("../utils/verifyJWT");

const router = express.Router();

router.get("/info", verifyJWT, GetuserInfo);

module.exports = router;
