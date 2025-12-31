const express = require("express");
const cors = require("cors");
const patientRoutes = require("./routes/patientRoute");
const visitRoutes = require("./routes/visitRoute");
const medicineRoutes = require("./routes/medicineRoute");
const prescriptionRoute = require('./routes/prescriptionRoute')

const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/appError");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api", visitRoutes);
app.use("/api/medicines", medicineRoutes);
app.use('/api/prescription', prescriptionRoute);


app.use((req, res, next) => {
  next(new AppError(`route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

module.exports = app;
