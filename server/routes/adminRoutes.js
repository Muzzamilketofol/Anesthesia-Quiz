// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, admin } = require('../middleware/authMiddleware');
const { getAllUsers, createUser, uploadChapter } = require('../controllers/adminController');

// Multer setup for in-memory file storage
const upload = multer({ storage: multer.memoryStorage() });

// User management routes (protected and for admins only)
router.route('/users').get(protect, admin, getAllUsers).post(protect, admin, createUser);

// Chapter upload route
router.route('/chapters/upload').post(protect, admin, upload.single('chapterFile'), uploadChapter);

module.exports = router;