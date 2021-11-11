const { Request, User } = require("../db");


const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({ include: User, order: [['createdAt', 'DESC']] });

    res.json(requests);
  } catch (e) {
    console.log(e);
    res.status(500).json("Server internal error");
  }
};
const getRequestsById = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findAll({ where: { UserId: id } });
    res.json(request);
  } catch (e) {
    console.log(e);
    res.status(500).json("Server internal error");
  }
};

module.exports = {
  getAllRequests,
  getRequestsById,
};
