const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../../middleware/auth.middleware');

// Rutas públicas (no requieren autenticación)
router.get('/', authController.main)
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rutas privadas (requieren autenticación)
router.get('/listUsersByGroup/:groupId', authenticateToken, authController.listUsersByGroup);

module.exports = router;