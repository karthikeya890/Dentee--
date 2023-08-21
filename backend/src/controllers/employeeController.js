const prisma = require("../prismaInstance");
const { verifyToken } = require("../utils/jwt");

const currentEmployee = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const { id } = await verifyToken(token);

  try {
    const response = await prisma.employees.findUnique({
      where: {
        id,
      },
    });

    if (response) {
      res.send(response);
    } else {
      throw Error("User Not Found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const { id } = await verifyToken(token);

  try {
    const response = await prisma.employees.update({
      where: {
        id,
      },
      data: {
        ...req.body,
      },
    });
    if (response) {
      return res.send(response);
    } else {
      throw Error("User Not Found");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { currentEmployee, updateEmployee };
