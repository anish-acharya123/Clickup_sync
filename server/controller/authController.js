const { default: axios } = require("axios");
const {
  ClickupURL,
  TokenAuthClickUp,
  clickupUserResponseRoute,
} = require("../utils/url");

const LoginAccount = (req, res) => {
  console.log("login success");
  try {
    res.redirect(ClickupURL);
  } catch (error) {
    console.error("Login initiation failed:", error);
    res.status(500).send("Login initiation failed");
  }
};

const ClickupCallbackk = async (req, res) => {
  try {
    const clickupCode = req.query.code; // callback will return as "/callback/clickup?code=***"

    /// now going to retrive token from clickup using this approach
    const clickupTokenResponse = await axios.post(TokenAuthClickUp, {});

    const ClickupToken = clickupTokenResponse.data.access_token;

    //now fetch the user detail from clickup  using that token
    const clickupUserDataResponse = await axios.get(clickupUserResponseRoute, {
      headers: {
        Authorization: ClickupToken,
      },
    });

    const clickUpuser = clickupUserDataResponse.data.user;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error in clickup callback" });
  }
};

module.exports = { LoginAccount, ClickupCallbackk };
