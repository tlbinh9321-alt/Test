const { admin } = require('../config/firebase');
const { hasPermission } = require('../config/roles');

/**
 * Middleware xác thực người dùng bằng Firebase ID Token
 */
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Không tìm thấy token xác thực.' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Lỗi xác thực token:', error);
    return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
  }
};

/**
 * Middleware kiểm tra quyền hạn của người dùng
 * @param {string} permission - Quyền cần kiểm tra (ví dụ: 'delete_data')
 */
const checkPermission = (permission) => {
  return (req, res, next) => {
    // Lưu ý: role thường được lưu trong Custom Claims của Firebase Auth
    // Hoặc bạn có thể truy vấn DB để lấy role dựa trên req.user.uid
    const userRole = req.user.role || 'user'; 

    if (hasPermission(userRole, permission)) {
      next();
    } else {
      return res.status(403).json({ 
        message: 'Bạn không có quyền thực hiện hành động này.',
        requiredPermission: permission 
      });
    }
  };
};

module.exports = {
  verifyToken,
  checkPermission
};
