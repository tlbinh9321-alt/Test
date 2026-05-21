/**
 * FILE: test_api_client.js
 * Script mô phỏng Frontend gọi API Backend để kiểm tra kết nối.
 * Cách chạy: 
 * 1. Chạy server backend: npm run dev
 * 2. Mở terminal mới chạy: node test_api_client.js
 */

// Cho phép lấy URL từ tham số dòng lệnh (ví dụ: node test_api_client.js https://api.vietsuso.com/api)
// Mặc định là localhost nếu không cung cấp.
const API_BASE_URL = process.argv[2] || 'http://localhost:5005/api';

console.log(`\n>>> ĐANG KIỂM TRA SERVER: ${API_BASE_URL} <<<\n`);

// Hàm helper để gọi API
async function callApi(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    console.log(`\n[${method}] ${endpoint}`);
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    return { status: response.status, data };
  } catch (error) {
    console.error(`\n[ERROR] ${method} ${endpoint}:`, error.message);
    return { error: error.message };
  }
}

async function runTests() {
  console.log('--- BẮT ĐẦU KIỂM TRA KẾT NỐI API ---');

  // 1. Kiểm tra Endpoint công khai: Lấy danh sách bài viết (nếu có collection 'posts')
  await callApi('/data/posts');

  // 2. Kiểm tra Endpoint công khai: Lấy điểm bản đồ (nếu có collection 'map_pins')
  await callApi('/data/map_pins');

  // 3. Mô phỏng gửi Đóng góp (Cần Token)
  console.log('\n--- Thử nghiệm gửi Submission (Yêu cầu Token) ---');
  const mockSubmission = {
    targetCollection: 'posts',
    data: {
      title: 'Ký ức Sài Gòn 1975 - Test Integration',
      content: 'Nội dung test từ script integration...',
      author: 'Tester'
    }
  };
  
  // Lưu ý: Sẽ lỗi 401/403 nếu không có token hợp lệ
  await callApi('/submissions/submit', 'POST', mockSubmission, 'YOUR_FIREBASE_ID_TOKEN_HERE');

  console.log('\n--- KẾT THÚC KIỂM TRA ---');
  console.log('Lưu ý: Các endpoint yêu cầu verifyToken cần có ID Token từ Firebase Auth (Frontend lấy sau khi login).');
}

runTests();
