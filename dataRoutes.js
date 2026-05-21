const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const { verifyToken, checkPermission } = require('../middlewares/auth');

// Lấy toàn bộ dữ liệu (Công khai)
router.get('/:collectionName', dataController.getAllData);

// Thêm dữ liệu mới (Yêu cầu quyền create_data - Admin hoặc Editor)
router.post('/:collectionName', verifyToken, checkPermission('create_data'), dataController.addData);

module.exports = router;
