const { admin, db } = require('../config/firebase');

/**
 * Đăng ký người dùng mới (Register)
 * @param {string} email
 * @param {string} password
 * @param {string} displayName
 */
const register = async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Thiếu email hoặc mật khẩu.' });
  }

  try {
    // 1. Tạo user trong Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: displayName || email.split('@')[0],
    });

    const uid = userRecord.uid;
    const role = 'user'; // Mặc định role là user

    // 2. Gán Custom Claim (Role) cho Auth
    await admin.auth().setCustomUserClaims(uid, { role });

    // 3. Lưu thông tin bổ sung vào Firestore (Database)
    await db.collection('users').doc(uid).set({
      uid: uid,
      email: email,
      displayName: userRecord.displayName,
      role: role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active'
    });

    return res.status(201).json({
      message: 'Đăng ký thành công và đã lưu vào database.',
      user: {
        uid: uid,
        email: email,
        displayName: userRecord.displayName,
        role: role
      }
    });
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ message: 'Email đã tồn tại.' });
    }
    return res.status(500).json({ message: 'Lỗi server khi đăng ký.' });
  }
};

/**
 * Xác thực Token và đồng bộ với DB nếu cần
 */
const verifyLogin = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: 'Thiếu ID Token.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // Lấy thêm thông tin user từ Firestore
    const userDoc = await db.collection('users').doc(uid).get();
    
    let userData = {};
    if (userDoc.exists) {
      userData = userDoc.data();
    } else {
      // Trường hợp user có trong Auth nhưng chưa có trong DB (do lỗi lúc đăng ký hoặc user cũ)
      // Ta có thể tự động tạo record ở đây nếu muốn
      userData = {
        uid,
        email,
        role: decodedToken.role || 'user',
        displayName: decodedToken.name || email.split('@')[0]
      };
      await db.collection('users').doc(uid).set({
        ...userData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'active'
      });
    }

    return res.status(200).json({
      message: 'Đăng nhập thành công.',
      user: userData
    });
  } catch (error) {
    console.error('Lỗi khi xác thực token:', error);
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
  }
};

/**
 * Gán quyền (Role) - Cập nhật cả Auth và DB
 */
const setRole = async (req, res) => {
  const { uid, role } = req.body;

  if (!uid || !role) {
    return res.status(400).json({ message: 'Thiếu UID hoặc Role.' });
  }

  const validRoles = ['admin', 'editor', 'user'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Role không hợp lệ.' });
  }

  try {
    // 1. Cập nhật Custom Claim
    await admin.auth().setCustomUserClaims(uid, { role });
    
    // 2. Cập nhật Firestore
    await db.collection('users').doc(uid).update({
      role: role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return res.status(200).json({ 
      message: `Đã gán thành công quyền ${role} cho người dùng ${uid} (Auth & DB).`
    });
  } catch (error) {
    console.error('Lỗi khi gán quyền:', error);
    return res.status(500).json({ message: 'Lỗi server khi gán quyền.' });
  }
};

/**
 * Lấy danh sách tất cả người dùng (Chỉ Admin)
 */
const getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').orderBy('createdAt', 'desc').get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return res.status(200).json(users);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    return res.status(500).json({ message: 'Lỗi server khi lấy danh sách người dùng.' });
  }
};

module.exports = {
  register,
  verifyLogin,
  setRole,
  getAllUsers
};
