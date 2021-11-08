const { Router } = require("express");
const { getArtistsByName, getAlbumsOfAnArtist } = require("../controllers/api");
const get_token = require("../middlewares/api");

const router = Router();

router.use(get_token);
router.get("/artist", getArtistsByName);
router.get("/albums/:id", getAlbumsOfAnArtist);

module.exports = router;
