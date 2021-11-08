const axios = require("axios");

const formatAlbumInfo = async (items) => {
    const list = []
    return Promise.all(items
        .map(async (d) => {
          if (!list.includes(d.name)) {
            console.log(!list.includes(d.name), list);
  
            const popularity = await axios
              .get(`albums/${d.id}`)
              .then((res) => res.data.popularity);
            list.push(d.name);
            return {
              id: d.id,
              name: d.name,
              image: d.images[0].url,
              external_urls: d.external_urls.spotify,
              total_tracks: d.total_tracks,
              popularity: popularity,
            };
          }
        })
        .filter((d) => !!d)
    )
}
  
module.exports= formatAlbumInfo