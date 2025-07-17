const Permission = require('../api/mongoose-models/Permission');

module.exports = async function () {
  console.time('SeedPermissions');
  sails.log('🔧 Đang chạy seedPermissions.js...');

  const permissions = [
    // 👤 User Management
    { name: 'view_user', description: 'Xem danh sách người dùng' },
    { name: 'create_user', description: 'Tạo người dùng mới' },
    { name: 'update_user', description: 'Cập nhật thông tin người dùng' },
    { name: 'delete_user', description: 'Xoá người dùng' },
    { name: 'assign_role', description: 'Gán vai trò cho người dùng' },

    // 🔐 Role Management
    { name: 'view_role', description: 'Xem danh sách vai trò' },
    { name: 'create_role', description: 'Tạo vai trò mới' },
    { name: 'update_role', description: 'Cập nhật vai trò' },
    { name: 'delete_role', description: 'Xoá vai trò' },
    { name: 'assign_permission', description: 'Gán quyền cho vai trò' },

    // 🛡️ Permission Management
    { name: 'view_permission', description: 'Xem danh sách quyền' },

    // 📦 Product Management
    { name: 'view_product', description: 'Xem danh sách sản phẩm' },
    { name: 'create_product', description: 'Tạo sản phẩm mới' },
    { name: 'update_product', description: 'Cập nhật sản phẩm' },
    { name: 'delete_product', description: 'Xoá sản phẩm' },

    // 📄 PageConfig CMS
    { name: 'view_page_config', description: 'Xem cấu hình trang CMS' },
    { name: 'update_page_config', description: 'Cập nhật cấu hình trang CMS' },
    { name: 'publish_page', description: 'Xuất bản trang CMS' },

    // 🔐 Auth
    { name: 'auth_register', description: 'Đăng ký tài khoản' },
    { name: 'auth_login', description: 'Đăng nhập hệ thống' },
    { name: 'auth_logout', description: 'Đăng xuất hệ thống' },
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
