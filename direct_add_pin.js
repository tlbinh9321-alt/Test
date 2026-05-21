const { db } = require('../config/firebase');

/**
 * Script để thêm trực tiếp một điểm ghim lên bản đồ mà không cần qua API/Duyệt
 * Cấu hình dữ liệu ở đây:
 */
const NEW_PIN = {
  title: 'Di tích Dinh Độc Lập',
  location: '135 Nam Kỳ Khởi Nghĩa, Quận 1, TP.HCM',
  lat: 10.7769, 
  lng: 106.6953,
  variant: 'gold', // gold, red, blue
  grade: 'Lớp 9',
  category: 'Ký ức nhân chứng',
  slug: 'ky-uc-thang-tu-sai-gon-1975' // Liên kết tới bài viết đã có
};

async function addDirectPin() {
  console.log('--- ĐANG THÊM ĐIỂM GHIM TRỰC TIẾP ---');
  
  try {
    const docRef = await db.collection('map_pins').add({
      ...NEW_PIN,
      createdAt: new Date().toISOString(),
      bypassModeration: true,
      addedVia: 'Direct Script'
    });

    console.log(`✅ THÀNH CÔNG!`);
    console.log(`ID bản ghi: ${docRef.id}`);
    console.log(`Điểm ghim "${NEW_PIN.title}" hiện đã có trên bản đồ.`);
    
  } catch (error) {
    console.error('❌ LỖI:', error.message);
  } finally {
    process.exit(0);
  }
}

addDirectPin();
