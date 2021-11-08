const { Router } = require('express');
const { getAllRequests, getRequestsById, postRequests } = require('../controllers/request');

const router = Router();


router.get("/", getAllRequests)
router.get("/:id", getRequestsById)

router.post("/", postRequests)

module.exports = router;
