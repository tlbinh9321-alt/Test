/**
 * Định nghĩa các vai trò (Roles) và quyền (Permissions) trong hệ thống.
 */

const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  USER: 'user',
};

// Định nghĩa các quyền cơ bản cho từng cấp độ
const basePermissions = {
  [ROLES.USER]: [
    'view_data',
  ],
  [ROLES.EDITOR]: [
    'create_data',
    'update_data',
    'upload_files',
  ],
  [ROLES.ADMIN]: [
    'delete_data',
    'manage_users',
  ],
};

// Xây dựng danh sách quyền theo kiểu kế thừa
const PERMISSIONS = {
  [ROLES.USER]: [...basePermissions[ROLES.USER]],
  [ROLES.EDITOR]: [
    ...basePermissions[ROLES.USER],
    ...basePermissions[ROLES.EDITOR]
  ],
  [ROLES.ADMIN]: [
    ...basePermissions[ROLES.USER],
    ...basePermissions[ROLES.EDITOR],
    ...basePermissions[ROLES.ADMIN]
  ],
};

/**
 * Hàm kiểm tra xem một role có quyền cụ thể hay không
 * @param {string} role - Vai trò của người dùng
 * @param {string} permission - Quyền cần kiểm tra
 * @returns {boolean}
 */
const hasPermission = (role, permission) => {
  if (!ROLES[role.toUpperCase()] && !Object.values(ROLES).includes(role)) {
    return false;
  }
  return PERMISSIONS[role]?.includes(permission) || false;
};

module.exports = {
  ROLES,
  PERMISSIONS,
  hasPermission
};
