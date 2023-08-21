const prisma = require("../prismaInstance");
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
        const token = await generateToken({
          id: response.id,
        });
        return res.send({ jwtToken: token });
      } else {
        throw Error("Incorrect password. Please try Again.");
      }
    } else {
      throw Error("The email address is not associated with any account.");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = login;
