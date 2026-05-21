const { admin } = require('../config/firebase');

/**
 * Script cấp quyền cho người dùng bằng Email.
 * Cách dùng: node src/scripts/setRoleByEmail.js <EMAIL> <ROLE>
 */

const email = process.argv[2];
const role = process.argv[3] || 'admin';

if (!email) {
  console.error('Vui lòng cung cấp Email của người dùng!');
  console.log('Ví dụ: node src/scripts/setRoleByEmail.js test@example.com admin');
  process.exit(1);
}

const setRoleByEmail = async () => {
  try {
    // 1. Tìm người dùng theo Email
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;

    // 2. Gán quyền
    await admin.auth().setCustomUserClaims(uid, { role });

    console.log(`---`);
    console.log(`THÀNH CÔNG:`);
    console.log(`- Email: ${email}`);
    console.log(`- UID: ${uid}`);
    console.log(`- Quyền được gán: '${role}'`);
    console.log(`---`);
    console.log(`Lưu ý: Người dùng cần đăng xuất và đăng nhập lại để quyền có hiệu lực.`);
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error(`LỖI: Không tìm thấy người dùng với email: ${email}`);
    } else {
      console.error('Lỗi khi thực hiện:', error.message);
    }
    process.exit(1);
  }
};

setRoleByEmail();
