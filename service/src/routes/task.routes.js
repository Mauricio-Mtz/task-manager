const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateToken } = require('../../middleware/auth.middleware');

// Todas las rutas requieren autenticación
router.use(authenticateToken);
router.post('/create', taskController.create);
router.get('/listTasksByUser', taskController.listTasksByUser);
router.get('/listTasksByGroup/:groupId', taskController.listTasksByGroup);
router.delete('/delete/:taskId', taskController.delete);
router.put('/updateStatus/:taskId', taskController.updateStatus);

module.exports = router;