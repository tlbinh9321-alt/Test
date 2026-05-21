const { admin } = require('../config/firebase');

/**
 * Script này dùng để cấp quyền Admin cho tài khoản đầu tiên.
 * Cách dùng: node src/scripts/initAdmin.js <UID_CUA_BAN>
 */

const uid = process.argv[2];

if (!uid) {
  console.error('Vui lòng cung cấp UID của người dùng!');
  console.log('Ví dụ: node src/scripts/initAdmin.js abc123xyz');
  process.exit(1);
}

const setFirstAdmin = async () => {
  try {
    await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
    console.log(`---`);
    console.log(`THÀNH CÔNG: Đã gán quyền 'admin' cho UID: ${uid}`);
    console.log(`Lưu ý: Nếu người dùng đang đăng nhập, họ cần đăng xuất và đăng nhập lại để quyền có hiệu lực.`);
    console.log(`---`);
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi gán quyền Admin:', error);
    process.exit(1);
  }
};

setFirstAdmin();
