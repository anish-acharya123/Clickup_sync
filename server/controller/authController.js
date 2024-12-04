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
const generateJWT = require("../utils/generateJwt");

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
  console.log("clickupcallback");
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

    console.log(clickUpuser, "clickupuser");
    //github OAuth
    res.redirect(
      `${GithubAuthURL}&clickupEmail=${clickUpuser.email}&clickupToken=${ClickupToken}&clickupName=${clickUpuser.username}`
    ); /// this is make githubOAuth and redirect to /callback/github path
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error in clickup callback" });
  }
};

const GithubCallback = async (req, res) => {
  console.log(req.query);
  console.log("github-callback");
  try {
    /// this route will be call as /callback/github?code=****&clickupEmail=***&clickupToken=****
    const {
      code: githubCode,
      clickupEmail,
      clickupToken,
      clickupName,
    } = req.query;

    if (!githubCode) res.status(400).send("Missing github Authorization code");

    /// now going to retrive token from github using this approach
    const githubTokenResponse = await axios.post(TokenAuthGithub, {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: githubCode,
      redirect_uri: process.env.GITHUB_REDIRECT_URI,
    });

    console.log(githubTokenResponse, "githubTokenResponse");
    const githubToken = githubTokenResponse.data.split("=")[1].split("&")[0];
    console.log(githubToken, "githubToken");

    const githubUserResponse = await axios.get(githubUserResponseRoute, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
    });

    // console.log(githubUserResponse, "githubuserresponse");

    const user = User.findOneAndUpdate(
      {
        email: clickupEmail || githubUserResponse.email,
      },
      {
        name: clickupName,
        clickupToken: clickupToken,
        githubToken: githubToken,
      }
    );

    const token = generateJWT(user);

    console.log("done");
    // res.redirect("http://localhost:5173/dashboard");
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // Prevent access to the cookie from JavaScript
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "Strict", // Restrict the cookie to your site only
      })
      .redirect("http://localhost:5173/");
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

module.exports = { LoginAccount, ClickupCallback, GithubCallback };
