const axios = require("axios");

const formatAlbumInfo = async (items) => {
  return Promise.all(
    items
      .map(async (d) => {
        const popularity = await axios
          .get(`albums/${d.id}`)
          .then((res) => res.data.popularity);
        return {
          id: d.id,
          name: d.name,
          image: d.images[0].url ? d.images[0].url : [{url:"https://blog.freemusicprojects.com/wp-content/uploads/2019/10/music-production-banner.jpg"}],
          external_urls: d.external_urls.spotify,
          total_tracks: d.total_tracks,
          popularity: popularity,
        };
      })
      .filter((d) => !!d)
  );
};

module.exports = formatAlbumInfo;
