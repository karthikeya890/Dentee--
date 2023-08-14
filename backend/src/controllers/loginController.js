const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await prisma.employees.findUnique({
      where: {
        email,
      },
    });

    if (response) {
      const ispasswordValid = await comparePassword(
        password,
        response.password
      );

      if (ispasswordValid) {
        const token = await generateToken(response);
        res.send({ jwtToken: token });
      } else {
        throw Error("Incorrect password. Please try Again.");
      }
    } else {
      throw Error("The email address is not associated with any account.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    prisma.$disconnect();
  }
};

module.exports = login;
