require("dotenv").config();
const axios = require("axios");
const { SPOTIFY_URL, SPOTIFY_AUTH_TOKEN } = process.env;

const setAxiosDefaults = () => {
  axios.defaults.baseURL = SPOTIFY_URL;
  axios.defaults.headers.common["Authorization"] = SPOTIFY_AUTH_TOKEN;
  return;
};

module.exports = setAxiosDefaults;
