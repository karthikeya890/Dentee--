const prisma = require("../prismaInstance");
const { verifyToken } = require("../utils/jwt");

const getClinics = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const { id } = await verifyToken(token);
  try {
    const response = await prisma.clinics.findMany({
      where: {
        employeesId: id,
      },
      orderBy: [{ validTill: "desc" }],
      include: {
        employees: true, // Include the associated user
      },
    });

    if (response) {
      return res.send(response);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postClinic = async (req, res) => {
  const {
    name,
    validTill,
    address1,
    address2,
    country,
    state,
    city,
    zipcodetimeZone,
  } = req.body;
  try {
    const response = await prisma.clinics.create({
      data: { ...req.body },
    });

    if (response) {
      const message = "Clinic Added Successfully!!!";
      return res.send({ message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getClinics, postClinic };
