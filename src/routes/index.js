const { Router } = require("express");
const router = Router();

const userRoutes = require("./userRoutes");
const requestRoutes = require("./requestRoutes");

router.use("/auth", userRoutes);
router.use("/request", requestRoutes);

module.exports = router;
