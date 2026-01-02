const express = require("express");
const prescriptionItemController = require("../controllers/prescription_itemController");

const router = express.Router();

router.post("/", prescriptionItemController.addItem);
router.get("/:prescriptionId", prescriptionItemController.getItemsByPrescription);
router.delete("/:id", prescriptionItemController.deleteItem);

module.exports = router;
