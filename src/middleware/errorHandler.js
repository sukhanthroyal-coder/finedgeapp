// ============================================
// MEMBER 3: Middleware & Utils Module
// ============================================
// Key Deliverables: Error handling, validation, and logging
// Files: errorHandler.js, logger.js, validator.js
// ============================================

const AppError = require('../utils/AppError');

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  // Set default error values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Internal Server Error';

  // Log error details
  const errorLog = {
    message: err.message,
    statusCode: err.statusCode,
    status: err.status,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  };

  // Log stack trace for operational errors or in development
  if (err.isOperational || process.env.NODE_ENV === 'development') {
    errorLog.stack = err.stack;
  }

  // Log the error
  if (err.statusCode >= 500) {
    console.error('Server Error:', errorLog);
  } else {
    console.warn('Client Error:', errorLog);
  }

  // Handle operational errors (known errors)
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

  // Handle programming/unknown errors - don't leak error details
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
