module.exports.callbackErrorHandler = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

class ApiError extends Error {
  constructor (message, statusCode, details) {
    super(message);

    this.statusCode = statusCode;
    this.details = details;
  }
}
module.exports.ApiError = ApiError;

module.exports.errorMiddleware = async (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    return res
      .status(error.statusCode)
      .json({
        message: error.message,
        details: error.details
      });
  } else if (error.name === 'ValidationError') {
    // Handle Mongoose validation errors
    return res
      .status(400)
      .json({
        message: 'Validation failed',
        details: error.message
      });
  } else if (error.name === 'MongoServerError') {
    let details = error.message;
    if (error.code === 11000) {
      details = 'Name or email of model must be unique';
    };
    // Handle Mongoose validation errors
    return res
      .status(400)
      .json({
        message: 'Validation failed',
        details
      });
  }

  console.log(error);
  return res.status(500).json({ details: 'Please try again later, we are facing an issue on our side.' });
};
