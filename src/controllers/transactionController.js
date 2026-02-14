
const transactionService = require('../services/transactionService');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const getAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await transactionService.getAllTransactions();
  res.status(200).json({
    success: true,
    data: transactions
  });
});

const getTransactionById = asyncHandler(async (req, res) => {
  const transaction = await transactionService.getTransactionById(req.params.id);
  
  if (!transaction) {
    throw new AppError('Transaction not found', 404);
  }
  
  res.status(200).json({
    success: true,
    data: transaction
  });
});

const createTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.createTransaction(req.body);
  res.status(201).json({
    success: true,
    data: transaction
  });
});

const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.updateTransaction(req.params.id, req.body);
  
  if (!transaction) {
    throw new AppError('Transaction not found', 404);
  }
  
  res.status(200).json({
    success: true,
    data: transaction
  });
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const deleted = await transactionService.deleteTransaction(req.params.id);
  
  if (!deleted) {
    throw new AppError('Transaction not found', 404);
  }
  
  res.status(200).json({
    success: true,
    message: 'Transaction deleted successfully'
  });
});

const getTransactionsByUserId = asyncHandler(async (req, res) => {
  const transactions = await transactionService.getTransactionsByUserId(req.params.userId);
  res.status(200).json({
    success: true,
    data: transactions
  });
});

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByUserId
};
