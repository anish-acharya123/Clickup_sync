const { default: axios } = require("axios");
const {
  ClickupURL,
  TokenAuthClickUp,
  clickupUserResponseRoute,
  GithubAuthURL,
  TokenAuthGithub,
  githubUserResponseRoute,
} = require("../utils/url");
const User = require("../models/userModel");

const LoginAccount = (req, res) => {
  console.log("login success");
  try {
    res.redirect(ClickupURL);
  } catch (error) {
    console.error("Login initiation failed:", error);
    res.status(500).send("Login initiation failed");
  }
};

const ClickupCallback = async (req, res) => {
  try {
    const clickupCode = req.query.code; // callback will return as "/callback/clickup?code=***"

    /// now going to retrive token from clickup using this approach
    const clickupTokenResponse = await axios.post(TokenAuthClickUp, {
      client_id: process.env.CLICKUP_CLIENT_ID,
      client_secret: process.env.CLICKUP_CLIENT_SECRET,
      code: clickupCode,
      redirect_uri: process.env.CLICKUP_REDIRECT_URI,
    });

    const ClickupToken = clickupTokenResponse.data.access_token;

    //now fetch the user detail from clickup  using that token
    const clickupUserDataResponse = await axios.get(clickupUserResponseRoute, {
      headers: {
        Authorization: ClickupToken,
      },
    });

    const clickUpuser = clickupUserDataResponse.data.user;

    //github OAuth
    res.redirect(
      `${GithubAuthURL}&clickupEmail=${clickUpuser.email}&clickupToken=${ClickupToken}`
    ); /// this is make githubOAuth and redirect to /callback/github path
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error in clickup callback" });
  }
};

const GithubCallback = async (req, res) => {
  /// this route will be call as /callback/github?code=****&clickupEmail=***&clickupToken=****
  const { code: githubCode, clickupEmail, clickupToken } = req.query;

  if (!githubCode) res.status(400).send("Missing github Authorization code");

  /// now going to retrive token from github using this approach
  const githubTokenResponse = await axios.post(TokenAuthGithub, {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: githubCode,
    redirect_uri: process.env.GITHUB_REDIRECT_URI,
  });

  const githubToken = githubTokenResponse.data.access_token;

  const githubUserResponse = await axios.get(githubUserResponseRoute, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
    },
  });

  const user = User.findOneAndUpdate(
    {
      email: clickupEmail || githubUserResponse.email,
    },
    {
      name: clickUpuser.name,
      clickupToken: clickupToken,
      githubToken: githubToken,
    }
  );
};

module.exports = { LoginAccount, ClickupCallback, GithubCallback };
