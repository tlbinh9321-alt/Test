const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

let serviceAccount = null;

// 1. Thử lấy từ biến môi trường (Ưu tiên cho Deployment)
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    const keyStr = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const decodedKey = keyStr.trim().startsWith('{') 
      ? keyStr 
      : Buffer.from(keyStr, 'base64').toString('utf-8');
    
    serviceAccount = JSON.parse(decodedKey);
    console.log('[Firebase] Khởi tạo bằng Service Account từ biến môi trường.');
  } catch (error) {
    console.error('[Firebase Error] Lỗi parse FIREBASE_SERVICE_ACCOUNT_KEY:', error.message);
  }
}

// 2. Nếu không có, thử đọc từ file (Dành cho chạy Local)
if (!serviceAccount) {
  try {
    serviceAccount = require('../../serviceAccountKey.json');
    console.log('[Firebase] Khởi tạo bằng file serviceAccountKey.json vật lý.');
  } catch (error) {
    console.error('[Firebase Error] Không tìm thấy credentials để khởi tạo Firebase.');
  }
}

if (!process.env.FIREBASE_STORAGE_BUCKET) {
  console.warn('CẢNH BÁO: FIREBASE_STORAGE_BUCKET không được định nghĩa trong .env');
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

const db = admin.firestore();

let bucket = null;
try {
  if (process.env.FIREBASE_STORAGE_BUCKET) {
    bucket = admin.storage().bucket();
  } else {
    console.warn('CẢNH BÁO: Không có FIREBASE_STORAGE_BUCKET. Tính năng upload file sẽ bị vô hiệu hóa.');
  }
} catch (error) {
  console.error('Lỗi khởi tạo Storage:', error.message);
}

module.exports = { admin, db, bucket };
