/**
 * scripts/seedRoles.js
 *
 * @description :: Seed dữ liệu Role và gán quyền tương ứng bằng Waterline ORM (Sails.js).
 */

module.exports = async function () {
    console.time('SeedRoles');
    sails.log('🔧 Đang chạy seedRoles.js...');

    const roleData = [
        {
            name: 'admin',
            description: 'Quản trị toàn hệ thống',
            permissions: [
                "auth_register", "auth_login", "auth_logout",
                "view_product", "create_product", "update_product", "delete_product",
                "view_page_config", "create_page_config", "update_page_config", "delete_page_config", "publish_page",
                "view_role", "create_role", "update_role", "delete_role", "assign_permission",
                "view_permission", "create_permission", "update_permission", "delete_permission",
                "view_user", "create_user", "update_user", "delete_user", "assign_role"
            ]
        },
        {
            name: 'editor',
            description: 'Biên tập viên nội dung',
            permissions: [
                "auth_register", "auth_login", "auth_logout",
                "view_product", "create_product", "update_product", "delete_product",
                "view_page_config", "create_page_config", "update_page_config", "delete_page_config", "publish_page"
            ]
        },
        {
            name: 'user',
            description: 'Người dùng thông thường',
            permissions: [
                "auth_register", "auth_login", "auth_logout",
                "view_product"
            ]
        }
    ];

    try {
        await User.destroy({}); // Xoá toàn bộ user hoặc lọc theo role cụ thể
        sails.log('🧹 Đã xoá toàn bộ người dùng cũ.');
        await Role.destroy({});
        sails.log('🧹 Đã xoá toàn bộ roles cũ.');

        for (const role of roleData) {
            // Lấy permission tương ứng theo tên
            const matchedPermissions = await Permission.find({
                name: role.permissions
            });

            if (matchedPermissions.length !== role.permissions.length) {
                sails.log.warn(`⚠️ Một số quyền không tìm thấy cho role ${role.name}`);
            }

            // Tạo role và gán quyền
            const createdRole = await Role.create({
                name: role.name,
                description: role.description,
                permissions: matchedPermissions.map(p => p.id)
            }).fetch();

            sails.log(`✅ Tạo role '${createdRole.name}' với ${matchedPermissions.length} quyền.`);
        }

        sails.log('🎉 Hoàn tất seed roles.');
    } catch (err) {
        sails.log.error('❌ Lỗi khi seed roles:', err.stack || err.message);
        throw err;
    }

    console.timeEnd('SeedRoles');
};
