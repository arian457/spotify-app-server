const { Router } = require("express");
const { getArtistsByName, getAlbumsOfAnArtist } = require("../controllers/api");

const router = Router();

router.get("/artist", getArtistsByName);
router.get("/albums/:id", getAlbumsOfAnArtist);

module.exports = router;
