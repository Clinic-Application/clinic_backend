const Setting = require("../models/settingModel");
const AppError = require("../utils/appError");

// GET SETTING
exports.getSetting = (req, res, next) => {
  Setting.get((err, setting) => {
    if (err) {
      return next(new AppError("Failed to fetch settings", 500));
    }

    res.status(200).json({
      status: "success",
      data: setting || null,
    });
  });
};

// CREATE OR UPDATE SETTING

exports.createOrUpdateSetting = (req, res, next) => {
  const { name, phone, address } = req.body;

  if (!name || !phone) {
    return next(new AppError("Name and phone are required", 400));
  }

  const logo = req.file ? `/uploads/logo/${req.file.filename}` : null;

  Setting.get((err, existing) => {
    if (err) {
      return next(new AppError("Database error", 500));
    }
    if (existing) {
      Setting.update(
        {
          logo: logo || existing.logo,
          name,
          phone,
          address,
        },
        (err) => {
          if (err) {
            return next(new AppError("Failed to update settings", 500));
          }

          res.status(200).json({
            status: "success",
            message: "Settings updated successfully",
          });
        }
      );
    }

    else {
      Setting.create(
        {
          logo,
          name,
          phone,
          address,
        },
        (err, id) => {
          if (err) {
            return next(new AppError("Failed to create settings", 500));
          }

          res.status(201).json({
            status: "success",
            data: { id },
          });
        }
      );
    }
  });
};
