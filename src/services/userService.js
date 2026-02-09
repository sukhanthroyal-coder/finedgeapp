// ============================================
// MEMBER 1: User APIs Module
// ============================================
// Key Deliverables: User routes and controller
// ============================================

const userModel = require('../models/userModel');

// Service layer functions
const getAllUsers = async () => {
  return await userModel.findAll();
};

const getUserById = async (id) => {
  return await userModel.findById(id);
};

const createUser = async (userData) => {
  return await userModel.create(userData);
};

const updateUser = async (id, userData) => {
  return await userModel.update(id, userData);
};

const deleteUser = async (id) => {
  return await userModel.remove(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
