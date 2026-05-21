/**
 * Script tạo trực tiếp một submission vào Firestore với điểm AI cố định là 0.7
 * Chạy lệnh: node seed_score_submission.js
 */

const { db } = require('./src/config/firebase');

async function seedSpecificScore() {
  console.log('>>> ĐANG TẠO SUBMISSION MẪU VỚI ĐIỂM AI = 0.7...');

  const testSubmission = {
    name: 'Nhà Sử Học Nhí',
    email: 'student@history.vn',
    role: 'Học sinh',
    province: 'Hà Nội',
    memoryTitle: 'Trận Điện Biên Phủ trên không 1972',
    period: 'Thời kỳ Kháng chiến chống Mỹ (1954 - 1975)',
    content: 'Ký ức về những ngày đêm Hà Nội rực lửa năm 1972, khi bầu trời đêm được thắp sáng bởi những vệt tên lửa ta bắn hạ B-52. Câu chuyện được kể lại từ ông nội tôi - một chiến sĩ pháo cao xạ năm xưa.',
    status: 'pending_review', // Để nó hiện ở Dashboard Admin
    type: 'PUBLIC_CONTRIBUTION',
    createdAt: new Date().toISOString(),
    aiResult: {
      isClean: true,
      score: 0.7,
      reason: 'Nội dung có giá trị lịch sử cao, ngôn từ trang trọng.',
      suggestion: 'Có thể bổ sung thêm hình ảnh tư liệu.'
    }
  };

  try {
    const docRef = await db.collection('submissions').add(testSubmission);
    console.log('\n✅ THÀNH CÔNG!');
    console.log('ID bài đóng góp:', docRef.id);
    console.log('Điểm AI đã gán:', testSubmission.aiResult.score);
    console.log('\nBây giờ bạn hãy mở Admin Dashboard để thấy bài này với nhãn "AI: 70%".');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ LỖI:', error.message);
    process.exit(1);
  }
}

seedSpecificScore();
