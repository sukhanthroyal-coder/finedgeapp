// ============================================
// MEMBER 1: User APIs Module
// ============================================
// Key Deliverables: User routes and controller
// Files: userRoutes.js, userController.js, userService.js, userModel.js
// ============================================

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../middleware/validator');

// User API Routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateUser, userController.createUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
