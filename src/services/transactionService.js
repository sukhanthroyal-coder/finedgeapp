const transactionModel = require('../models/transactionModel');

const getAllTransactions = async () => {
  return await transactionModel.findAll();
};

const getTransactionById = async (id) => {
  return await transactionModel.findById(id);
};

const createTransaction = async (transactionData) => {
  return await transactionModel.create(transactionData);
};

const updateTransaction = async (id, transactionData) => {
  return await transactionModel.update(id, transactionData);
};

const deleteTransaction = async (id) => {
  return await transactionModel.remove(id);
};

const getTransactionsByUserId = async (userId) => {
  return await transactionModel.findByUserId(userId);
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByUserId
};
