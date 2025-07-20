
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user (client/lawyer/admin)
// @access  Public
router.post('/register', authController.register);

// // @route   POST /api/auth/login
// // @desc    Login user and return JWT token
// // @access  Public
router.post('/login', authController.login);

module.exports = router;