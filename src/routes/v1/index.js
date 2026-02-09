// ============================================
// API Version 1 Routes Index
// ============================================
// Combines all v1 API routes
// ============================================

const express = require('express');
const router = express.Router();

// Import v1 route modules
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');
const analyticsRoutes = require('./analyticsRoutes');

// Mount v1 routes
router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;

