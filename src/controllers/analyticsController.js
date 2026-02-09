// ============================================
// MEMBER 4: Analytics & Documentation Module
// ============================================
// Key Deliverables: Summary logic and Postman collection
// ============================================

const analytics = require('../utils/analytics');
const userModel = require('../models/userModel');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Get user financial summary
 * GET /api/v1/analytics/user/:userId/summary
 */
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

/**
 * Get transaction statistics
 * GET /api/v1/analytics/stats
 */
const getStats = asyncHandler(async (req, res) => {
  const { userId, startDate, endDate, category, type } = req.query;
  
  const filters = {};
  if (userId) filters.userId = userId;
  if (startDate) filters.startDate = startDate;
  if (endDate) filters.endDate = endDate;
  if (category) filters.category = category;
  if (type) filters.type = type;
  
  // Validate type if provided
  if (type && !['income', 'expense'].includes(type)) {
    throw new AppError("Type must be either 'income' or 'expense'", 400);
  }
  
  // Verify user exists if userId is provided
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

/**
 * Get spending insights for a user
 * GET /api/v1/analytics/user/:userId/insights
 */
const getUserInsights = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;
  
  // Verify user exists
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

/**
 * Get category breakdown for a user
 * GET /api/v1/analytics/user/:userId/categories
 */
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

