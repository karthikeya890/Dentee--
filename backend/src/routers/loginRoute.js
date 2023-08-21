const login = require("../controllers/loginController");
const { Router } = require("express");

const router = Router();

router.post("/", login);

module.exports = router;
