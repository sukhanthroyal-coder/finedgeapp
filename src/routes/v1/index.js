const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');
const analyticsRoutes = require('./analyticsRoutes');

router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;

