module.exports = (err, req, res, next) =>{

    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server Error";

    res.status(statusCode).json({
        status: "error",
        message
    })
}