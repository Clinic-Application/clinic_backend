const Visit = require("../models/visitModel");
const AppError = require("../utils/appError");

exports.getVisitsByPatient = (req, res, next) => {
  const { patientId } = req.params;

  if (!patientId || isNaN(patientId)) {
    return next(new AppError("invalid patient Id", 400));
  }

  Visit.getByPatientId(patientId, (err, visits) => {
    if (err) return next(new AppError("Database Error", 500));
    if (!visits) return next(new AppError("visits not found", 404));

    res.status(200).json({
      status: "success",
      results: visits.length,
      data: visits,
    });
  });
};

exports.getVisitById = (req, res, next) =>{
    const {visitId} = req.params;

    if(!visitId || isNaN(visitId)){
        return next(new AppError('invalid visit ID', 400))
    }

    Visit.getById(visitId, (err, visit) =>{
        if(err) return next(new AppError('Database Error', 500));
        if(!visit) return next(new AppError('visit not found', 404));

        res.status(200).json({
            status: 'success',
            data: visit
        })
    })
}

exports.createVisit = (req, res, next) =>{
    const patientId= parseInt(req.params.patientId);
    const data = req.body;

    if(!patientId && isNaN(patientId)){
        return next(new AppError("invalid patient ID", 400));
    }
    Visit.create(patientId, data, (err, visitId) =>{
        if(err) return next(new AppError("database error", 500))

        res.status(201).json({
            status: "success",
            message:"visit created successfully",
            visitId
        })
    })
}

exports.updateVisit = (req, res, next) =>{
    const {visitId} = req.params;
    const data = req.body;
    
    if(!visitId && isNaN(visitId)){
        return next(new AppError("invalid visit ID", 400));
    }
    if(Object.keys(data).length === 0){
        return next(new AppError("no data provided for update", 400));
    }

    Visit.update(visitId, data, (err, changes) =>{
        if(err) return next(new AppError('Database Error', 500));
        if(changes ===0) return next(new AppError("visit not found", 404))

        res.status(200).json({
            status: "success",
            message: "visit update successfully"
        })
    })
}