const axios = require("axios");
const setAxiosDefaults = require("../config/axios");
const { Request, User } = require("../db");
const formatAlbumInfo = require("../utils/albumFormatter");

const getArtistsByName = async (req, res) => {
  const { artist_name, offset } = req.query;

  setAxiosDefaults(req.token);
  try {
    const { items } = await axios
      .get(
        `/search?q=artist%3A${encodeURI(
          artist_name
        )}&type=artist&limit=5&offset=${offset ?? 0}`
      )
      .then((res) => res.data.artists);

    res.json(items);
  } catch (e) {
    console.log(e);
    res.status(500).json("Server internal error");
  }
};

const getAlbumsOfAnArtist = async (req, res) => {
  const { id } = req.params;
  const { UserId, ip_address } = req.query;

  setAxiosDefaults(req.token);
  try {
    const albums = await axios
      .get(`/artists/${id}/albums`)
      .then(async (res) => {
        const { items } = res.data;
        const artist_name = items[0]?.artists[0]?.name;
        const newRequest = await Request.create({
          ip_address,
          artist_name,
        });
        if (UserId) {
          const user = await User.findOne({ where: { id: UserId } });
          user && user.addRequest(newRequest);
        }
        const shortAlbumData = await formatAlbumInfo(items).then((res) =>
          res.sort((a, b) => b.popularity - a.popularity)
        );
        return shortAlbumData;
      });
    res.json(albums);
  } catch (e) {
    console.log(e);
    res.status(500).json("Server internal error");
  }
};

module.exports = {
  getArtistsByName,
  getAlbumsOfAnArtist,
};
