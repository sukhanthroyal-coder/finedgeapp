
const analytics = require('../utils/analytics');
const userModel = require('../models/userModel');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const getUserSummary = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;
  
  // Verify user exists
  const user = await userModel.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  const summary = await analytics.calculateUserSummary(userId, startDate, endDate);
  
  res.status(200).json({
    success: true,
    data: summary
  });
});

const getStats = asyncHandler(async (req, res) => {
  const { userId, startDate, endDate, category, type } = req.query;
  
  const filters = {};
  if (userId) filters.userId = userId;
  if (startDate) filters.startDate = startDate;
  if (endDate) filters.endDate = endDate;
  if (category) filters.category = category;
  if (type) filters.type = type;

  if (type && !['income', 'expense'].includes(type)) {
    throw new AppError("Type must be either 'income' or 'expense'", 400);
  }
  
  if (userId) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
  }
  
  const stats = await analytics.getTransactionStats(filters);
  
  res.status(200).json({
    success: true,
    data: stats
  });
});

const getUserInsights = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  const user = await userModel.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  const insights = await analytics.generateSpendingInsights(userId, startDate, endDate);
  
  res.status(200).json({
    success: true,
    data: insights
  });
});

const getCategoryBreakdown = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;
  
  // Verify user exists
  const user = await userModel.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  const breakdown = await analytics.getCategoryBreakdown(userId, startDate, endDate);
  
  res.status(200).json({
    success: true,
    data: breakdown
  });
});

module.exports = {
  getUserSummary,
  getStats,
  getUserInsights,
  getCategoryBreakdown
};

