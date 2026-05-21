const multer = require('multer');

// Sử dụng memoryStorage để multer lưu file vào buffer thay vì lưu vào đĩa
// Điều này giúp dễ dàng upload thẳng lên Firebase Storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // Giới hạn 50MB
  }
});

module.exports = upload;
