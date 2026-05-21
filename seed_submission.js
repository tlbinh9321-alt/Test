/**
 * Script gửi một bản đóng góp mẫu (submission) để test Admin Dashboard.
 * Chạy lệnh: node seed_submission.js
 */

async function seedSubmission() {
  const url = 'http://localhost:5005/api/submissions/public';
  
  // Dữ liệu mẫu
  const testData = new URLSearchParams();
  testData.append('name', 'Nguyễn Văn Chứng Nhân');
  testData.append('email', 'chungnhan@test.com');
  testData.append('role', 'Nhân chứng lịch sử');
  testData.append('province', 'Hồ Chí Minh');
  testData.append('memoryTitle', 'Ký ức ngày 30 tháng 4 năm 1975');
  testData.append('period', 'Thời kỳ Kháng chiến chống Mỹ (1954 - 1975)');
  testData.append('content', 'Đây là một câu chuyện mẫu được gửi tự động để kiểm tra tính năng duyệt bài của Admin Dashboard. Nội dung kể về những kỷ niệm khó quên trong ngày giải phóng miền Nam, thống nhất đất nước.');

  console.log('>>> ĐANG GỬI SUBMISSION MẪU...');

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: testData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const result = await response.json();

    if (response.ok) {
      console.log('\n✅ THÀNH CÔNG!');
      console.log('ID bài đóng góp:', result.id);
      console.log('Thông báo:', result.message);
      console.log('\nBây giờ bạn hãy mở Admin Dashboard, vào tab "Bài đăng" để thấy bài này.');
    } else {
      console.error('\n❌ THẤT BẠI!');
      console.error('Lỗi:', result.message || response.statusText);
    }
  } catch (error) {
    console.error('\n❌ LỖI KẾT NỐI:', error.message);
    console.log('Hãy đảm bảo Backend đang chạy ở cổng 5005 (npm run dev).');
  }
}

seedSubmission();
