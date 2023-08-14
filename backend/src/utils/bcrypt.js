const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const comparePassword = async (password, hashedPassword) => {
  const response = await bcrypt.compare(password, hashedPassword);
  return response;
};

module.exports = { hashPassword, comparePassword };
