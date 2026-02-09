// ============================================
// MEMBER 1: User APIs Module
// ============================================
// Key Deliverables: User routes and controller
// ============================================

const userService = require('../services/userService');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

// Controller functions
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({
    success: true,
    data: users
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({
    success: true,
    data: user
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const deleted = await userService.deleteUser(req.params.id);
  
  if (!deleted) {
    throw new AppError('User not found', 404);
  }
  
  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
