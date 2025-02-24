const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { authenticateToken } = require('../../middleware/auth.middleware');

// Todas las rutas requieren autenticación
router.use(authenticateToken);
router.post('/create', groupController.create);
router.get('/listGroupsByUser', groupController.listGroupsByUser);
router.get('/listGroupsByCreator', groupController.listGroupsByCreator);
router.post('/enroll', groupController.enroll);
router.delete('/delete', groupController.delete);

module.exports = router;