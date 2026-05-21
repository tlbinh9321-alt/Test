const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { verifyToken } = require('../middlewares/auth');

// Endpoint gọi AI trực tiếp (Cần đăng nhập)
router.post('/check', verifyToken, aiController.checkContent);

module.exports = router;
