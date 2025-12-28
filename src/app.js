const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoute');
const errorHandler = require("./middlewares/errorHandler");
const AppError = require('./utils/appError');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRoutes);

app.use((req, res, next) =>{
    next(new AppError(`route ${req.originalUrl} not found`, 404));
})

app.use(errorHandler);

module.exports = app;