// ============================================
// MEMBER 3: Middleware & Utils Module
// ============================================
// Key Deliverables: Error handling, validation, and logging
// ============================================

// Request/response logging middleware
const logger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`;
    
    // Log with different levels based on status code
    if (res.statusCode >= 500) {
      console.error(logMessage);
    } else if (res.statusCode >= 400) {
      console.warn(logMessage);
    } else {
      console.log(logMessage);
    }
  });
  
  next();
};

module.exports = logger;
