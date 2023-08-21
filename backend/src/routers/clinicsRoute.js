const { getClinics, postClinic } = require("../controllers/clinicsController");
const { Router } = require("express");

const router = Router();

router.get("/", getClinics);
router.post("/", postClinic);

module.exports = router;
