
const express = require('express');
const router = express.Router();
const analyticsController = require('../../controllers/analyticsController');

router.get('/user/:userId/summary', analyticsController.getUserSummary);
router.get('/user/:userId/insights', analyticsController.getUserInsights);
router.get('/user/:userId/categories', analyticsController.getCategoryBreakdown);
router.get('/stats', analyticsController.getStats);

module.exports = router;

