# Hướng dẫn kết nối Front-end với Backend

Dưới đây là các ví dụ sử dụng `fetch` API (JavaScript/React) để gửi yêu cầu đến Backend của bạn.

## 1. Cấu hình URL cơ sở
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 2. Lấy dữ liệu từ Firestore
Giả sử bạn có collection tên là `history_events`.

```javascript
async function fetchEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/data/history_events`);
    const data = await response.json();
    console.log('Dữ liệu:', data);
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
  }
}
```

## 3. Thêm dữ liệu mới vào Firestore
```javascript
async function addEvent(eventData) {
  try {
    const response = await fetch(`${API_BASE_URL}/data/history_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    const result = await response.json();
    console.log('Kết quả thêm:', result);
  } catch (error) {
    console.error('Lỗi khi thêm dữ liệu:', error);
  }
}

// Ví dụ gọi hàm:
// addEvent({ title: 'Trận Bạch Đằng', year: 938 });
```

## 4. Tải tệp lên Firebase Storage
Sử dụng `FormData` để gửi tệp.

```javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      body: formData, // Không đặt Content-Type header, trình duyệt sẽ tự làm
    });
    const result = await response.json();
    console.log('URL file đã upload:', result.url);
    return result.url;
  } catch (error) {
    console.error('Lỗi khi upload file:', error);
  }
}

// Ví dụ trong React (input type="file"):
// const handleFileChange = (e) => uploadFile(e.target.files[0]);
```

## 5. Dành cho Admin: Quản lý hàng đợi kiểm duyệt (Queue Review)

Dưới đây là các hàm để Admin/Editor quản lý các bài đăng chờ duyệt. Lưu ý: Các yêu cầu này **cần gửi kèm Token** của Admin.

### 5.1 Lấy danh sách chờ duyệt
```javascript
async function getPendingSubmissions(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/submissions/pending`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chờ:', error);
  }
}
```

### 5.2 Phê duyệt hoặc Từ chối một bản ghi
```javascript
async function reviewSubmission(submissionId, action, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/submissions/review/${submissionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ action }) // action là 'approve' hoặc 'reject'
    });
    const result = await response.json();
    alert(result.message);
    return result;
  } catch (error) {
    console.error('Lỗi khi duyệt bài:', error);
  }
}

// Ví dụ gọi hàm:
// reviewSubmission('ID_CUA_BAI_VIET', 'approve', 'TOKEN_CUA_ADMIN');
```

## 6. API Quản lý Bài viết (Posts) & AI (Mới)

### 6.1 Đăng bài viết kèm Media
```javascript
async function createPost(postData, token) {
  // postData: { title, content, media: [{url, type, key}] }
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(postData)
  });
  return await res.json();
}
```

### 6.2 Gọi AI kiểm tra nội dung trực tiếp
```javascript
async function checkContentWithAI(content, token) {
  const res = await fetch(`${API_BASE_URL}/ai/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      content: content,
      prompt_type: 'moderation'
    })
  });
  return await res.json();
}
```

### 6.3 Chuyên gia duyệt bài (Admin/Editor)
```javascript
async function reviewPost(postId, action, reason, token) {
  // action: 'APPROVE', 'REJECT', 'REQUEST_MODIFICATION'
  const res = await fetch(`${API_BASE_URL}/posts/review/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ action, reason })
  });
  return await res.json();
}
```

## 7. Lưu ý về CORS
Backend hiện tại đã được cài đặt middleware `cors()`, cho phép mọi domain truy cập. Nếu bạn chạy Front-end ở port khác (ví dụ: 3000), nó vẫn sẽ hoạt động bình thường.
