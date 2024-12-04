require("dotenv").config();


/// clickup
const ClickupURL = `https://app.clickup.com/api?client_id=${process.env.CLICKUP_CLIENT_ID}&redirect_uri=${process.env.CLICKUP_REDIRECT_URI}`;
const TokenAuthClickUp = "https://api.clickup.com/api/v2/oauth/token"
const clickupUserResponseRoute = "https://api.clickup.com/api/v2/user";

//github
const GithubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=repo user`;
const TokenAuthGithub = `https://github.com/login/oauth/access_token`
const githubUserResponseRoute = "https://api.github.com/user";

module.exports = {
  ClickupURL,
  TokenAuthClickUp,
  clickupUserResponseRoute,
  GithubAuthURL,
  TokenAuthGithub,
  githubUserResponseRoute,
};
