const Role = require('../api/mongoose-models/Role');
const Permission = require('../api/mongoose-models/Permission');

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
        await Role.deleteMany({});
        sails.log('🧹 Đã xoá toàn bộ role cũ');

        for (const role of roleData) {
            const permissions = await Permission.find({ name: { $in: role.permissions } });

            const createdRole = await Role.create({
                name: role.name,
                description: role.description,
                permissions: permissions.map(p => p._id)
            });

            sails.log(`✅ Tạo role: ${createdRole.name} với ${permissions.length} quyền`);
        }

        sails.log('🎉 Seed roles hoàn tất!');
    } catch (err) {
        sails.log.error('❌ Lỗi khi seed roles:', err.stack || err.message);
        throw err;
    }

    console.timeEnd('SeedRoles');
};
