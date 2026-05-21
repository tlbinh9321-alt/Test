# Tài liệu Tổng hợp Backend Node.js & Firebase

Dự án này cung cấp một hệ thống Backend hoàn chỉnh để làm việc với Firebase Firestore và Storage.

## 1. Cấu trúc thư mục hiện tại
```
/
├── src/
│   ├── config/             # Cấu hình Firebase Admin SDK
│   │   └── firebase.js
│   ├── controllers/        # Logic xử lý Firestore & Storage
│   │   ├── dataController.js
│   │   └── fileController.js
│   ├── routes/             # API endpoints
│   │   ├── dataRoutes.js
│   │   └── fileRoutes.js
│   ├── middlewares/        # Xử lý upload tệp
│   │   └── upload.js
│   └── index.js            # Entry point
├── .env                    # Biến môi trường
├── serviceAccountKey.json  # Khóa bảo mật Firebase
└── package.json
```

## 2. Trạng thái các Nhiệm vụ (Tasks)
- [x] Task 1: Khởi tạo project và cài đặt thư viện.
- [x] Task 2: Tạo cấu trúc thư mục.
- [x] Task 3: Thiết lập cấu hình Firebase Admin SDK.
- [x] Task 4: Triển khai Middleware xử lý upload tệp.
- [x] Task 5: Triển khai CRUD Firestore (Data API).
- [x] Task 6: Triển khai logic tải tệp lên Storage (File API).
- [x] Task 7: Hoàn thiện Server chính và kiểm tra kết nối.
- [x] Task 8: Thiết lập hệ thống phân quyền (RBAC) & Custom Claims.
- [x] Task 9: Bảo mật các API endpoints bằng Middleware.
- [x] Task 10: Tạo công cụ khởi tạo Admin (Script).

## 3. Hướng dẫn kết nối từ Front-end (Mẫu Code)

### Cấu hình URL cơ sở
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Lấy dữ liệu (GET)
```javascript
async function getData(collectionName) {
  const res = await fetch(`${API_BASE_URL}/data/${collectionName}`);
  return await res.json();
}
```

### Thêm dữ liệu (POST)
```javascript
async function addData(collectionName, data) {
  const res = await fetch(`${API_BASE_URL}/data/${collectionName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}
```

### Tải tệp lên (Upload)
```javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE_URL}/files/upload`, {
    method: 'POST',
    body: formData,
  });
  return await res.json();
}
```

## 4. Cách chạy Server
1. Cài đặt dependency: `npm install` (nếu chưa làm).
2. Chạy server: `npm start`.
3. Kiểm tra tại: `http://localhost:5000`.

## 5. Bảo mật (Security Rules)
Hệ thống sử dụng **Admin SDK**, do đó Backend có toàn quyền. Nếu bạn dùng thêm Client SDK, hãy cấu hình Rules trong Firebase Console như sau:
- **Firestore:** `allow read, write: if request.auth != null;`
- **Storage:** `allow read; allow write: if request.auth != null;`
