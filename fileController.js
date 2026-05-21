const { bucket } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

exports.uploadFile = async (req, res) => {
  try {
    if (!bucket) {
      return res.status(400).json({ message: 'Tính năng upload file hiện chưa được cấu hình (Cần gói Blaze).' });
    }

    if (!req.file) {
      return res.status(400).send('Không có tệp nào được tải lên.');
    }

    const blob = bucket.file(`${Date.now()}_${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });

    blobStream.on('finish', async () => {
      // Lấy URL công khai (Cần cấu hình bucket công khai hoặc dùng signed URL)
      // Ở đây dùng cách đơn giản nhất là cấu hình URL theo pattern
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      
      res.status(200).json({
        message: 'Tải lên thành công',
        url: publicUrl
      });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
