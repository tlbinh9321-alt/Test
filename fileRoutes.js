const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const upload = require('../middlewares/upload');
const { verifyToken, checkPermission } = require('../middlewares/auth');

// Route tải tệp lên (Yêu cầu quyền upload_files - Admin hoặc Editor)
router.post('/upload', verifyToken, checkPermission('upload_files'), upload.single('file'), fileController.uploadFile);

module.exports = router;
