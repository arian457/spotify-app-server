const client_id = "f0ba6d51a5c74ea89182c9b22acab468";
const client_secret = "8eada2aea73442f981b4eb456d458868";
const request = require("request");

const get_token = async (req, res, next) => {
  try {
    await request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        req.token = body.access_token;
        next();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json("Error de conexión");
  }
};

var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

module.exports = get_token;
