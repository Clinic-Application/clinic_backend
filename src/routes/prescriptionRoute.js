const express = require("express");
const prescriptionController = require("../controllers/prescriptionController");

const router = express.Router();

// create prescription
router.post("/", prescriptionController.createPrescription);

// get prescription by visit
router.get("/visit/:visitId", prescriptionController.getPrescriptionByVisit);

module.exports = router;
