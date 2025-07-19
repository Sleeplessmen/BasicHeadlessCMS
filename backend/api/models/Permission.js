/**
 * Permission.js
 *
 * @description :: Mô hình quyền (permission) trong hệ thống RBAC.
 */

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true,
            unique: true
        },

        description: {
            type: 'string',
            defaultsTo: ''
        },

        // Mối quan hệ ngược với Role (many-to-many)
        roles: {
            collection: 'role',
            via: 'permissions'
        }
    }
};
/**
 * Lưu ý:
 * - Mối quan hệ many-to-many giữa Permission và Role được định nghĩa thông qua collection 'role' trong Role.js.
 * - Sử dụng Waterline ORM để quản lý các mối quan hệ và tự động hóa việc tạo bảng liên kết.
 */
