const express = require("express");
const router = express.Router();
const visitController = require("../controllers/visitController");
const checkPatientExists = require('../middlewares/checkPatientExists');


// visits by patient
router
  .route("/patients/:patientId/visits")
  .get(checkPatientExists ,visitController.getVisitsByPatient)
  .post(checkPatientExists , visitController.createVisit)


router.route('/visits/:visitId').get(visitController.getVisitById)

module.exports = router;