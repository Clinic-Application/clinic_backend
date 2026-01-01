const PrescriptionItem = require("../models/prescription_itemModel");
const AppError = require("../utils/appError");
const Prescription = require("../models/prescriptionModel");
const Medicine = require("../models/medicineModel");

exports.addItem = (req, res, next) => {
  const { prescription_id, medicine_id, quantity, frequency } = req.body;

  if (!prescription_id || isNaN(prescription_id)) {
    return next(new AppError("Invalid prescription_id", 400));
  }

  if (!medicine_id || isNaN(medicine_id)) {
    return next(new AppError("Invalid medicine_id", 400));
  }

  if (!quantity || quantity <= 0) {
    return next(new AppError("Invalid quantity", 400));
  }

  //  check prescription
  Prescription.findById(prescription_id, (err, prescription) => {
    if (err) return next(new AppError("DB error", 500));
    if (!prescription) return next(new AppError("Prescription not found", 404));

    //  check medicine
    Medicine.findById(medicine_id, (err, medicine) => {
      if (err) return next(new AppError("DB error", 500));
      if (!medicine) return next(new AppError("Medicine not found", 404));

      //  check duplicate
      PrescriptionItem.findByPrescriptionAndMedicine(
        prescription_id,
        medicine_id,
        (err, existingItem) => {
          if (err) {
            return next(new AppError("DB error while checking duplicate", 500));
          }

          if (existingItem) {
            return next(
              new AppError(
                "This medicine already added to this prescription",
                409
              )
            );
          }

          //  insert (use medicine table values)
          PrescriptionItem.create(
            {
              prescription_id,
              medicine_id,
              medicine_name: medicine.name,
              type: medicine.type,
              power: medicine.power,
              quantity,
              frequency,
            },
            (err, id) => {
              if (err) {
                return next(new AppError("Failed to add medicine", 500));
              }

              res.status(201).json({
                status: "success",
                data: { id },
              });
            }
          );
        }
      );
    });
  });
};

// GET ITEMS
exports.getItemsByPrescription = (req, res, next) => {
  const { prescriptionId } = req.params;

  if (!prescriptionId || isNaN(prescriptionId)) {
    return next(new AppError("Invalid prescription ID", 400));
  }

  PrescriptionItem.getByPrescriptionId(prescriptionId, (err, items) => {
    if (err) {
      return next(new AppError("Failed to fetch prescription items", 500));
    }

    res.status(200).json({
      status: "success",
      results: items.length,
      data: items,
    });
  });
};

// DELETE ITEM

exports.deleteItem = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return next(new AppError("Invalid item ID", 400));
  }

  PrescriptionItem.delete(id, (err, changes) => {
    if (err) {
      return next(new AppError("Failed to delete prescription item", 500));
    }

    if (changes === 0) {
      return next(new AppError("Prescription item not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Prescription item deleted",
    });
  });
};
