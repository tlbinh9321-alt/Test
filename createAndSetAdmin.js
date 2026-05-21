const { admin } = require('../config/firebase');

/**
 * Script tạo tài khoản mới và cấp quyền Admin ngay lập tức.
 * Cách dùng: node src/scripts/createAndSetAdmin.js <EMAIL> <PASSWORD>
 */

const email = process.argv[2] || 'khangphanhuynh2007@gmail.com';
const password = process.argv[3] || 'Admin123456!'; // Mật khẩu mặc định nếu không cung cấp

const run = async () => {
  try {
    console.log(`--- Đang xử lý cho: ${email} ---`);
    
    let userRecord;
    try {
      // 1. Kiểm tra xem user đã tồn tại chưa
      userRecord = await admin.auth().getUserByEmail(email);
      console.log(`- Tài khoản đã tồn tại (UID: ${userRecord.uid})`);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // 2. Nếu chưa có thì tạo mới
        userRecord = await admin.auth().createUser({
          email: email,
          password: password,
          emailVerified: true,
          displayName: 'Super Admin'
        });
        console.log(`- Đã tạo tài khoản mới thành công (UID: ${userRecord.uid})`);
      } else {
        throw error;
      }
    }

    // 3. Gán quyền Admin (Quyền cao nhất hiện tại trong hệ thống RBAC của bạn)
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });
    
    console.log(`---`);
    console.log(`THÀNH CÔNG!`);
    console.log(`- Email: ${email}`);
    console.log(`- Mật khẩu: ${password}`);
    console.log(`- Quyền hạn: ADMIN (Cao nhất)`);
    console.log(`---`);
    console.log(`Lưu ý: Bạn hãy dùng thông tin trên để đăng nhập vào hệ thống.`);
    process.exit(0);
  } catch (error) {
    console.error('LỖI:', error.message);
    process.exit(1);
  }
};

run();
