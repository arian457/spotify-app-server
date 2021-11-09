require("dotenv").config();
const axios = require("axios");
const { SPOTIFY_URL } = process.env;

const setAxiosDefaults = (token) => {
  axios.defaults.baseURL = SPOTIFY_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return;
};

module.exports = setAxiosDefaults;
