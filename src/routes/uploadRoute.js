const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../config/upload');

router.post('/upload/:id',
    authenticateToken,
    upload.single('avatar'),
    uploadController.uploadAvatar
);

module.exports = router;