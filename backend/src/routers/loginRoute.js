const login = require("../controllers/loginController");
const { Router } = require("express");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = Router();

router.post("/", login);

module.exports = router;
