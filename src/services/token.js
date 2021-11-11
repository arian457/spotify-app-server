const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;
exports.generateToken = (authenticatedUser) => {
  const { id, email, userName } = authenticatedUser;
  return jwt.sign(
    {
      id,
      email,
      userName,
    },
    JWT_SECRET,
    { expiresIn: "1 day" }
  );
};
exports.decryptToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
