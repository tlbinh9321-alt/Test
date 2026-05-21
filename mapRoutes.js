const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');
const { verifyToken, checkPermission } = require('../middlewares/auth');

// Lấy các điểm ghim trên bản đồ (Công khai)
router.get('/pins', mapController.getMapPins);

// Lấy danh sách ký ức tóm tắt cho bản đồ (Công khai)
router.get('/memories', mapController.getMapMemories);

// Thêm điểm ghim trực tiếp (Chỉ Admin/Editor - Bỏ qua AI và Duyệt)
router.post('/pins', verifyToken, checkPermission('create_data'), mapController.addMapPin);

module.exports = router;
