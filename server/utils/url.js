require("dotenv").config();


/// clickup
const ClickupURL = `https://app.clickup.com/api?client_id=${process.env.CLICKUP_CLIENT_ID}&redirect_uri=${process.env.CLICKUP_REDIRECT_URI}`;
const TokenAuthClickUp = "https://api.clickup.com/api/v2/oauth/token"
const clickupUserResponseRoute = "https://api.clickup.com/api/v2/user";

module.exports = { ClickupURL, TokenAuthClickUp, clickupUserResponseRoute };
