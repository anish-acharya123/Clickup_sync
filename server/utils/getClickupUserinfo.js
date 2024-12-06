const { default: axios } = require("axios");


// Define a function to make GET requests
const getClickupData = async (path, token) => {
  const baseURL = "https://api.clickup.com/api/v2";
  try {
    const response = await axios.get(`${baseURL}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return error;
  }
};

module.exports = {
  getClickupData,
};
