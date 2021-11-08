const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");
const requestRoutes = require("./requestRoutes");
const apiRoutes = require("./apiRoutes")

router.use("/auth", userRoutes);
router.use("/request", requestRoutes);
router.use("/spotify", apiRoutes);

module.exports = router;
