const { default: axios } = require("axios");

const getClickupUserinfo = async (clickupToken) => {
  try {
    const response = await axios.get("https://api.clickup.com/api/v2/user", {
      headers: { Authorization: `Bearer ${clickupToken}` },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

module.exports = getClickupUserinfo;
