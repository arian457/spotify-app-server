const axios = require("axios");
const setAxiosDefaults = require("../config/axios");
const { Request } = require("../db");

setAxiosDefaults()

const getArtistsByName = async (req, res) => {
  const { artist_name } = req.body;
  try {
    const { items } = await axios.get(
      `/search?q=artist%3A${encodeURI(artist_name)}&type=artist&limit=5`
    ).then((res) => res.data.artists);
    res.json(items);
  } catch (e) {
    console.log(e);
    res.status(500).json("Server internal error");
  }
};
const getAlbumsOfAnArtist = async (req, res) => {
  const { id } = req.params;
  const { UserId, ip_address } = req.body;
  try {
    const { name } = await axios.get(`/artists/${id}`).then((res) => res.data);
    const { items } = await axios.get(`/artists/${id}/albums`).then((res) => res.data);
    await Request.create({
      ip_address,
      artist_name: name,
      UserId,
    });
    res.json(items);
  } catch (e) {
    console.log(e);
    res.status(500).json("Server internal error");
  }
};

module.exports = {
  getArtistsByName,
  getAlbumsOfAnArtist,
};
