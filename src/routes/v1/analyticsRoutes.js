// ============================================
// MEMBER 4: Analytics & Documentation Module - API v1
// ============================================
// Key Deliverables: Summary logic and Postman collection
// ============================================

const express = require('express');
const router = express.Router();
const analyticsController = require('../../controllers/analyticsController');

// Analytics API Routes v1
router.get('/user/:userId/summary', analyticsController.getUserSummary);
router.get('/user/:userId/insights', analyticsController.getUserInsights);
router.get('/user/:userId/categories', analyticsController.getCategoryBreakdown);
router.get('/stats', analyticsController.getStats);

module.exports = router;

