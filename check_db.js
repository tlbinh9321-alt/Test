const { db } = require('./src/config/firebase');

const checkCollections = async () => {
  try {
    const collections = await db.listCollections();
    if (collections.length === 0) {
      console.log('---');
      console.log('Database hiện đang TRỐNG (chưa có collection nào).');
      console.log('---');
    } else {
      console.log('--- Danh sách các collection hiện có: ---');
      collections.forEach(col => {
        console.log(`- ${col.id}`);
      });
      console.log('-----------------------------------------');
    }
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi kiểm tra database:', error.message);
    process.exit(1);
  }
};

checkCollections();
