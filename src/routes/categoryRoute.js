const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/category', categoryController.getAllCategory);
router.get('/category/:id', categoryController.getCategoryById);
router.post('/category', categoryController.createCategory);
router.put('/category/:id', categoryController.updateCateggory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;