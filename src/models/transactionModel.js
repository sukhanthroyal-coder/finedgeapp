// ============================================
// MEMBER 2: Transaction APIs Module
// ============================================
// Key Deliverables: Transaction module implementation
// ============================================

const fs = require('fs').promises;
const path = require('path');

const TRANSACTIONS_FILE = path.join(__dirname, '../data/transactions.json');

// TODO: Implement data access layer functions:
// - findAll()              - Read all transactions from transactions.json
// - findById(id)           - Find transaction by ID
// - create(transactionData) - Add new transaction to transactions.json
// - update(id, transactionData) - Update transaction in transactions.json
// - delete(id)             - Remove transaction from transactions.json
// - findByUserId(userId)   - Find all transactions for a user

// Helper function to read transactions file
const readTransactionsFile = async () => {
  try {
    const data = await fs.readFile(TRANSACTIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write transactions file
const writeTransactionsFile = async (transactions) => {
  await fs.writeFile(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
};

// Model functions
const findAll = async () => {
  return await readTransactionsFile();
};

const findById = async (id) => {
  const transactions = await readTransactionsFile();
  return transactions.find((t) => String(t.id) === String(id)) || null;
};

const create = async (transactionData) => {
  const transactions = await readTransactionsFile();
  const nextId = transactions.length === 0 
    ? 1 
    : Math.max(...transactions.map(t => Number(t.id) || 0)) + 1;
  
  const newTransaction = {
    id: nextId,
    userId: Number(transactionData.userId),
    amount: Number(transactionData.amount),
    type: transactionData.type, // 'income' or 'expense'
    category: transactionData.category || 'uncategorized',
    description: transactionData.description || '',
    date: transactionData.date || new Date().toISOString()
  };
  
  transactions.push(newTransaction);
  await writeTransactionsFile(transactions);
  return newTransaction;
};

const update = async (id, transactionData) => {
  const transactions = await readTransactionsFile();
  const index = transactions.findIndex((t) => String(t.id) === String(id));
  
  if (index === -1) return null;
  
  const updatedTransaction = {
    ...transactions[index],
    ...transactionData,
    id: transactions[index].id,
    userId: transactionData.userId !== undefined ? Number(transactionData.userId) : transactions[index].userId,
    amount: transactionData.amount !== undefined ? Number(transactionData.amount) : transactions[index].amount
  };
  
  transactions[index] = updatedTransaction;
  await writeTransactionsFile(transactions);
  return updatedTransaction;
};

const remove = async (id) => {
  const transactions = await readTransactionsFile();
  const index = transactions.findIndex((t) => String(t.id) === String(id));
  
  if (index === -1) return false;
  
  transactions.splice(index, 1);
  await writeTransactionsFile(transactions);
  return true;
};

const findByUserId = async (userId) => {
  const transactions = await readTransactionsFile();
  return transactions.filter((t) => String(t.userId) === String(userId));
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  findByUserId
};
