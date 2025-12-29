const db = require("../config/database");
const AppError = require("../utils/appError");

const checkPatientExists = (req, res, next) => {
  const { patientId } = req.params;

  if (!patientId || isNaN(patientId)) {
    return next(new AppError("Invalid patient Id", 400));
  }

  const sql = `SELECT patient_id FROM patient WHERE patient_id = ?`;

  db.get(sql, [patientId], (err, patient) => {
    if (err) {
      return next(new AppError("database error", 500));
    }
    if (!patient){
        return next(new AppError('patient not found', 404))
    }
    next();
  });
};

module.exports = checkPatientExists;
