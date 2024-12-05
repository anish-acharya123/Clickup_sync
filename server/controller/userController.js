const User = require("../models/userModel");
const getClickupUserinfo = require("../utils/getClickupUserinfo");

const GetuserInfo = async (req, res) => {
  const { email } = req.user;

  try {
    const ClickupToken = await User.findOne({ email }, { clickupToken: 1 });
    if (!ClickupToken) {
      res.status(404).json({ msg: "User not found" });
    }

    console.log(ClickupToken);
    console.log("process....");
    const userInfo = await getClickupUserinfo(ClickupToken.clickupToken);
    console.log(userInfo);

    res.status(201).json(userInfo);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { GetuserInfo };
