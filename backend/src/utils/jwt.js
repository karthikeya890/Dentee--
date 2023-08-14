const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = async (userDetails) => {
  const token = await jwt.sign(userDetails, secretKey);

  return token;
};

const verifyToken = async (token) => {
  const decodedToken = await jwt.verify(token, secretKey);

  return decodedToken;
};

module.exports = { generateToken, verifyToken };
