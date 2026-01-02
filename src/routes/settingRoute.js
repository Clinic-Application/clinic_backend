const express = require("express");
const settingController = require("../controllers/settingController");
const uploadLogo = require("../middlewares/uploadLogo");

const router = express.Router();

// get setting
router.get("/", settingController.getSetting);

// create or update (with logo upload)
router.post(
  "/",
  uploadLogo.single("logo"),
  settingController.createOrUpdateSetting
);

module.exports = router;
