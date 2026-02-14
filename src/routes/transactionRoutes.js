const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { validateTransaction } = require('../middleware/validator');

router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransactionById);
router.post('/', validateTransaction, transactionController.createTransaction);
router.put('/:id', validateTransaction, transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);
router.get('/user/:userId', transactionController.getTransactionsByUserId);

module.exports = router;
