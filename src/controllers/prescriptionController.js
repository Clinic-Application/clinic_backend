const Prescription = require("../models/prescriptionModel");
const Visit = require("../models/visitModel");
const AppError = require("../utils/appError");

// create prescription
exports.createPrescription = (req, res, next) => {
  const { visit_id } = req.body;

  if (!visit_id || isNaN(visit_id)) {
    return next(new AppError("Invalid visit_id", 400));
  }

  Visit.findById(visit_id, (err, visit) => {
    if (err) {
      return next(new AppError("database error while checking visit", 500));
    }
    if (!visit) {
      return next(new AppError("visit not found", 404));
    }

    Prescription.create(visit_id, (err, result) => {
      if (err) {
        return next(new AppError("Failed to create prescription", 500));
      }

      res.status(201).json({
        status: "success",
        data: result,
      });
    });
  });
};

// GET PRESCRIPTION BY VISIT
exports.getPrescriptionByVisit = (req, res, next) => {
  const visit_id = Number(req.params.visitId);

  if (!visit_id) {
    return next(new AppError("Invalid visit id", 400));
  }

  Prescription.getByVisitId(visit_id, (err, prescription) => {
    if (err) {
      return next(new AppError("Database error", 500));
    }

    if (!prescription) {
      return next(new AppError("Prescription not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: prescription,
    });
  });
};
