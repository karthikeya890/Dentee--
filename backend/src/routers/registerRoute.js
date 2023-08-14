const register = require("../controllers/registerController");
const { Router } = require("express");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = Router();

const isEmailValidHandler = async (req, res, next) => {
  const { email } = req.body;

  const response = await prisma.employees.findUnique({
    where: {
      email,
    },
  });

  if (response) {
    res.status(500).json({ message: "Email Already Exists" });
  } else {
    next();
  }
};

router.post("/", [isEmailValidHandler], register);

module.exports = router;
