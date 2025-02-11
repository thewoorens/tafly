const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getCategories, createCategory, deleteCategory, getCategoryById } = require('../controllers/categoryController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Route tanımlamaları
router.get('/get/categories', authenticateToken, getCategories);
router.get('/get/editCategory/:id', authenticateToken, getCategoryById);
router.post('/post/createCategory', authenticateToken, upload.single('image'), createCategory);
router.delete('/delete/deleteCategory', authenticateToken, deleteCategory);

module.exports = router;