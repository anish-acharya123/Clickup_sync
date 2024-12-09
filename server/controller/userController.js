const User = require("../models/userModel");
const { getClickupData } = require("../utils/getClickupUserinfo");

const GetuserInfo = async (req, res) => {
  const { email } = req.user;

  try {
    const ClickupToken = await User.findOne({ email }, { clickupToken: 1 });
    if (!ClickupToken) {
      res.status(404).json({ msg: "User not found" });
    }

    const userInfo = await getClickupData("/user", ClickupToken.clickupToken);
    // console.log(userInfo, "userinfo");

    res.status(201).json(userInfo);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const validateUser = (req, res) => {
  try {
    // If the middleware allows the request to reach here, the user is authenticated.
    res.status(200).json({ message: "User is authenticated", user: req.user });
  } catch (error) {
    console.error("Validation Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { GetuserInfo, validateUser };
