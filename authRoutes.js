const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, checkPermission } = require('../middlewares/auth');

/**
 * Đăng ký tài khoản mới
 */
router.post('/register', authController.register);

/**
 * Xác thực login (sau khi client login qua Firebase SDK)
 */
router.post('/verify-login', authController.verifyLogin);

/**
 * Gán quyền (Chỉ Admin)
 */
router.post('/set-role', verifyToken, checkPermission('manage_users'), authController.setRole);

/**
 * Lấy danh sách người dùng (Chỉ Admin)
 */
router.get('/users', verifyToken, checkPermission('manage_users'), authController.getAllUsers);

module.exports = router;
