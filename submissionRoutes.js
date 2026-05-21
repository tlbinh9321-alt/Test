const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const { verifyToken, checkPermission } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Gửi bài đóng góp công khai (Từ Form "Đóng góp ký ức" của Frontend)
// Hỗ trợ cả 2 endpoint để đảm bảo tương thích
router.post('/public', upload.array('files', 5), submissionController.submitPublicContribution);
router.post('/public-submit', upload.array('files', 5), submissionController.submitPublicContribution);

// Gửi bài để AI kiểm duyệt (Yêu cầu đăng nhập, mọi người dùng đều có thể gửi)
router.post('/submit', verifyToken, submissionController.submitForReview);

// Lấy danh sách chờ duyệt (Chỉ Admin và Editor)
router.get('/pending', verifyToken, checkPermission('update_data'), submissionController.getPendingSubmissions);

// Phê duyệt hoặc Từ chối (Chỉ Admin và Editor)
router.post('/review/:submissionId', verifyToken, checkPermission('update_data'), submissionController.reviewSubmission);

module.exports = router;
