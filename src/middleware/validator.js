
const AppError = require('../utils/AppError');

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  const errors = [];
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }
  
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    errors.push('Valid email is required');
  }
  
  if (errors.length > 0) {
    const errorMessage = errors.join(', ');
    return next(new AppError(errorMessage, 400));
  }
  
  next();
};

const validateTransaction = (req, res, next) => {
  const { userId, amount, type } = req.body;
  const errors = [];
  
  if (userId === undefined || userId === null || isNaN(Number(userId))) {
    errors.push('Valid userId is required');
  }
  
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    errors.push('Valid amount is required');
  }
  
  if (!type || !['income', 'expense'].includes(type)) {
    errors.push("Type must be either 'income' or 'expense'");
  }
  
  if (errors.length > 0) {
    const errorMessage = errors.join(', ');
    return next(new AppError(errorMessage, 400));
  }
  
  next();
};

module.exports = {
  validateUser,
  validateTransaction
};
