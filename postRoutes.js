const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken, checkPermission } = require('../middlewares/auth');

// Đăng bài viết mới (Mọi người dùng đã đăng nhập)
router.post('/', verifyToken, postController.createPost);

// Duyệt bài viết (Admin hoặc Editor)
router.post('/review/:postId', verifyToken, checkPermission('update_data'), postController.reviewPost);

// Lấy danh sách bài viết (Công khai)
router.get('/', postController.getPosts);

// Lấy chi tiết bài viết theo slug (Công khai)
router.get('/:slug', postController.getPostBySlug);

module.exports = router;
