const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');


router.get('/users', authenticateToken, userController.getAllUsers);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.post('/login', authController.login);

module.exports = router;