const { Router } = require('express');
const { getAllRequests, getRequestsById } = require('../controllers/request');

const router = Router();


router.get("/", getAllRequests)
router.get("/:id", getRequestsById)



module.exports = router;
