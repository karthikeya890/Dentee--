const {
  currentEmployee,
  updateEmployee,
} = require("../controllers/employeeController");
const { Router } = require("express");

const router = Router();

router.get("/employee", currentEmployee);
router.put("/employee", updateEmployee);

module.exports = router;
