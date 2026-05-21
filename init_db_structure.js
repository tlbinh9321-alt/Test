const { db } = require('./src/config/firebase');

const initDatabase = async () => {
  try {
    console.log('--- Đang khởi tạo cấu trúc Database ---');

    // 1. Tạo dữ liệu mẫu cho users (đã có user admin của bạn)
    const adminEmail = 'khangphanhuynh2007@gmail.com';
    const adminUid = 'mTZfuVKte0doevRA1JoQNzPO6Wm2'; // UID từ bước trước
    
    await db.collection('users').doc(adminUid).set({
      email: adminEmail,
      role: 'ADMIN',
      displayName: 'Super Admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    console.log('✔ Đã khởi tạo collection: users');

    // 2. Tạo collection: posts (Dữ liệu mẫu)
    const samplePostId = 'sample-post-123';
    await db.collection('posts').doc(samplePostId).set({
      user_id: adminUid,
      title: 'Chào mừng đến với Việt Sử Số',
      content: 'Đây là bài viết mẫu đầu tiên để khởi tạo cấu trúc hệ thống.',
      status: 'PUBLISHED',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    console.log('✔ Đã khởi tạo collection: posts');

    // 3. Tạo collection: post_media
    await db.collection('post_media').add({
      post_id: samplePostId,
      media_url: 'https://example.com/sample-image.jpg',
      media_type: 'image',
      storage_key: 'posts/sample-post-123/image.jpg',
      created_at: new Date().toISOString()
    });
    console.log('✔ Đã khởi tạo collection: post_media');

    // 4. Tạo collection: moderation_histories
    const sampleModHistoryId = 'sample-mod-log-123';
    await db.collection('moderation_histories').doc(sampleModHistoryId).set({
      post_id: samplePostId,
      reviewer_id: null, // Do AI xử lý
      tier: 'TIER_2',
      action: 'APPROVE',
      reason: 'AI chấm điểm cao, tự động duyệt.',
      created_at: new Date().toISOString()
    });
    console.log('✔ Đã khởi tạo collection: moderation_histories');

    // 5. Tạo collection: ai_assessments
    await db.collection('ai_assessments').add({
      post_id: samplePostId,
      moderation_history_id: sampleModHistoryId,
      model_version: 'google/gemini-2.0-flash',
      score: 0.98,
      evidence: {
        matches: ["Nội dung phù hợp với sử liệu"],
        flags: []
      },
      created_at: new Date().toISOString()
    });
    console.log('✔ Đã khởi tạo collection: ai_assessments');

    console.log('---');
    console.log('THÀNH CÔNG: Đã khởi tạo toàn bộ cấu trúc database theo yêu cầu.');
    console.log('---');
    process.exit(0);
  } catch (error) {
    console.error('LỖI khi khởi tạo database:', error.message);
    process.exit(1);
  }
};

initDatabase();
