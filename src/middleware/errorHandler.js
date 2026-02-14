
const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Internal Server Error';


  const errorLog = {
    message: err.message,
    statusCode: err.statusCode,
    status: err.status,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  };

  if (err.isOperational || process.env.NODE_ENV === 'development') {
    errorLog.stack = err.stack;
  }

  if (err.statusCode >= 500) {
    console.error('Server Error:', errorLog);
  } else {
    console.warn('Client Error:', errorLog);
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      error: {
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      }
    });
  }

  console.error('Programming Error:', err);
  
  return res.status(500).json({
    success: false,
    status: 'error',
    error: {
      message: process.env.NODE_ENV === 'development' 
        ? err.message 
        : 'Something went wrong!',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

module.exports = errorHandler;
