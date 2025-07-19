/**
 * Role.js
 *
 * @description :: Mô hình vai trò người dùng trong hệ thống (RBAC).
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

        // Mối quan hệ many-to-many với Permission
        permissions: {
            collection: 'permission',
            via: 'roles'
        },

        // Nếu muốn truy ngược từ user → role
        users: {
            collection: 'user',
            via: 'role'
        }
    }
};
/**
 * Lưu ý:
 * - Sử dụng Waterline ORM với MongoDB, nên để schema = true để tránh lưu dữ liệu dư thừa không định nghĩa.
 * - Migrate = 'alter' giúp tự động cập nhật schema khi phát triển.
 * - Cấu trúc id chuẩn với MongoDB sử dụng _id.
 * - Tự động thêm createdAt, updatedAt tương tự như timestamps của mongoose.
 */
