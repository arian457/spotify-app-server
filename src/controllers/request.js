const { Request } = require("../db");

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.json(requests);
  } catch (e) {
    console.log(e);
    res.status(500).json("Server internal error");
  }
};
const getRequestsById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const request = await Request.findAll({ where: { UserId: id } });
    res.json(request);
  } catch (e) {
    console.log(e);
    res.status(500).json("Server internal error");
  }
};
const postRequests = async (req, res) => {
  const { ip_address, UserId, artist_name } = req.body;
  try {
    const newRequest = await Request.create({
      ip_address,
      artist_name,
      UserId,
    });
    newRequest.save();
    res.json("ok");
  } catch (e) {
    console.log(e);
    res.status(500).json("Server internal error");
  }
};

module.exports = {
  getAllRequests,
  getRequestsById,
  postRequests,
};
