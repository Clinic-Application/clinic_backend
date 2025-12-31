const Medicine = require("../models/medicineModel");
const AppError = require("../utils/appError");

// create
exports.createMedicine = (req, res, next) => {
  const { name, type, power } = req.body;
  console.log(name, type, power);
  if (!name || !type || !power) {
    return next(new AppError("Medicine name, type and power is required", 400));
  }

  Medicine.create(req.body, (err, id) => {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        return next(new AppError("This medicine already exists", 409));
      }
    }

    res.status(201).json({
      status: "success",
      data: { medicine_id: id },
    });
  });
};

// get all medicine
exports.getAllMedicines = (req, res, next) => {
  Medicine.getAll((err, medicines) => {
    if (err) {
      return next(new AppError("Failed to fetch medicines", 500));
    }

    res.status(200).json({
      status: "success",
      results: medicines.length,
      data: medicines,
    });
  });
};

// get one medicine
exports.getMedicine = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return next(new AppError("Invalid medicine ID", 400));
  }

  Medicine.getById(id, (err, medicine) => {
    if (err) {
      return next(new AppError("Database error", 500));
    }

    if (!medicine) {
      return next(new AppError("Medicine not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: medicine,
    });
  });
};

// update
exports.updateMedicine = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return next(new AppError("Invalid medicine ID", 400));
  }

  Medicine.update(id, req.body, (err, changes) => {
    if (err) {
      return next(new AppError("Failed to update medicine", 500));
    }

    if (changes === 0) {
      return next(new AppError("Medicine not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Medicine updated successfully",
    });
  });
};

// Delete
exports.deleteMedicine = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return next(new AppError("Invalid medicine ID", 400));
  }

  Medicine.delete(id, (err, changes) => {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        return next(new AppError("Medicine is used in prescriptions", 409));
      }
      return next(new AppError("Failed to delete medicine", 500));
    }

    if (changes === 0) {
      return next(new AppError("Medicine not found", 404));
    }

    res.status(200).json({
      message: "success and hi Ahmad and rahmat and basir",
    });
  });
};
