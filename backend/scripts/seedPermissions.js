const Permission = require('../api/mongoose-models/Permission');

module.exports = async function () {
    console.time('SeedPermissions');
    sails.log('🔧 Đang chạy seedPermissions.js...');

    // Danh sách permission thủ công
    const permissions = [
        // Auth
        { name: 'auth_register', description: 'Đăng ký' },
        { name: 'auth_login', description: 'Đăng nhập' },
        { name: 'auth_logout', description: 'Đăng xuất' },

        // Product
        { name: 'view_product', description: 'Xem sản phẩm' },
        { name: 'create_product', description: 'Tạo sản phẩm' },
        { name: 'update_product', description: 'Cập nhật sản phẩm' },
        { name: 'delete_product', description: 'Xoá sản phẩm' },

        // Page Config
        { name: 'view_page_config', description: 'Xem cấu hình trang' },
        { name: 'create_page_config', description: 'Tạo cấu hình trang' },
        { name: 'update_page_config', description: 'Cập nhật cấu hình trang' },
        { name: 'delete_page_config', description: 'Xoá cấu hình trang' },
        { name: 'publish_page', description: 'Xuất bản trang' },

        // Role
        { name: 'view_role', description: 'Xem vai trò' },
        { name: 'create_role', description: 'Tạo vai trò' },
        { name: 'update_role', description: 'Cập nhật vai trò' },
        { name: 'delete_role', description: 'Xoá vai trò' },
        { name: 'assign_permission', description: 'Gán quyền cho vai trò' },

        // Permission
        { name: 'view_permission', description: 'Xem quyền' },
        { name: 'create_permission', description: 'Tạo quyền' },
        { name: 'update_permission', description: 'Cập nhật quyền' },
        { name: 'delete_permission', description: 'Xoá quyền' },

        // User
        { name: 'view_user', description: 'Xem người dùng' },
        { name: 'create_user', description: 'Tạo người dùng' },
        { name: 'update_user', description: 'Cập nhật người dùng' },
        { name: 'delete_user', description: 'Xoá người dùng' },
        { name: 'assign_role', description: 'Gán vai trò cho người dùng' },
    ];

    try {
        await Permission.deleteMany({});
        sails.log('🧹 Đã xoá toàn bộ permission cũ');

        const created = await Permission.insertMany(permissions);
        sails.log(`✅ Đã tạo ${created.length} permissions`);
    } catch (err) {
        sails.log.error('❌ Lỗi khi seed permissions:', err.stack || err.message);
        throw err;
    }

    console.timeEnd('SeedPermissions');
};
