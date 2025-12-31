const express = require("express");
const medicineController = require("../controllers/medicineController");

const router = express.Router();

router
  .route("/")
  .get(medicineController.getAllMedicines)
  .post(medicineController.createMedicine);

router
  .route("/:id")
  .get(medicineController.getMedicine)
  .patch(medicineController.updateMedicine)
  .delete(medicineController.deleteMedicine);

module.exports = router;
