
// middleware for handle the errors
exports.errorHandler = function errorHandler(err, req, res, next) {
    const { statusCode, message } = err;
    res.status(statusCode || 500).json({
        Status: statusCode || 500,
        Message: message || 'Something went wrong processing your request'
    });
};
