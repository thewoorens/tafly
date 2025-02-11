// routes/user.js
const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/userController'); // getUser fonksiyonunu import et
const { authenticateToken } = require('../middlewares/authMiddleware');

// Route tanımlamaları
router.get('/get/user', authenticateToken, getUser);

module.exports = router;