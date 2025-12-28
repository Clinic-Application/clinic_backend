const AppError = require("../utils/appError");
const Patient = require("./../models/patientModel");

exports.createPatient = (req, res, next) => {
  const { fullname, age, gender } = req.body;

  if (!fullname || !age || !gender) {
    return next(new AppError("Required fields are missing", 400));
  }

  Patient.create(req.body, (err, id) => {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        return next(new AppError("phone number already exist", 409));
      }
      return next(new AppError("Database error", 500));
    }
    res.status(201).json({
      status: "success",
      patient_id: id,
    });
  });
};

exports.getPatients = (req, res, next) => {
  Patient.getAll(req.query,(err, rows) => {
    if (err) {
      return next(new AppError("Failed to fetch data", 500));
    }
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: rows,
    });
  });
};

exports.getPatientById = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return next(new AppError("invalid patient Id", 400));
  }

  Patient.getById(req.params.id, (err, row) => {
    if (err) {
      return next(new AppError("failed to fetch patient", 500));
    }
    if (!row) {
      return next(new AppError("patient not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: row,
    });
  });
};

exports.updatePatient = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return next(new AppError("invalid patient id", 400));
  }
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("no data provided for update", 400));
  }

  Patient.update(req.params.id, req.body, (err, changes) => {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        return next(new AppError("phone number already exist", 409));
      }
      return next(new AppError("database error when updating patient", 500));
    }
    if (changes === 0) {
      return next(new AppError("patient not found", 404));
    }
    res.status(200).json({
      status: "success",
      message: "patient updated successfully",
    });
  });
};

exports.deletePatient = (req, res, next) => {
  const { id } = req.params;
  if(!id || isNaN(id)){
    return next(new AppError('invalid patient Id', 400))
  }

  Patient.delete(id, (err, changes) => {
    if (err) {
      if(err.code ==='SQL_CONSTRAINT'){
        return next(new AppError("cannot delete patient with related visits or prescriptions", 409))
      }

      return next(new AppError('database error while deleting patient', 500))
    }
    
    if(changes ===0){
        return next(new AppError('patient not found', 404))
    }

    res.status(200).json({ 
        status: "success",
        message: "patient deleted successfully"
    });
  });
};
