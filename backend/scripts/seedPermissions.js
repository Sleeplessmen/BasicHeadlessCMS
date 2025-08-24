module.exports = async function seedPermissions() {
    console.time("SeedPermissions");
    sails.log("🔧 Đang chạy seedPermissions.js...");

    // Danh sách permission: action + resource + description
    const permissionsToSeed = [
        // ————————————————————————
        // 🔐 USER
        // ————————————————————————
        {
            action: "read",
            resource: "user",
            description: "Xem danh sách và thông tin người dùng",
        },
        {
            action: "create",
            resource: "user",
            description: "Tạo người dùng mới",
        },
        {
            action: "update",
            resource: "user",
            description: "Cập nhật thông tin người dùng",
        },
        {
            action: "delete",
            resource: "user",
            description: "Xoá hoặc vô hiệu hoá người dùng",
        },
        {
            action: "assign-role",
            resource: "user",
            description: "Gán vai trò cho người dùng",
        },

        // ————————————————————————
        // 🎖️ ROLE
        // ————————————————————————
        {
            action: "read",
            resource: "role",
            description: "Xem danh sách và chi tiết vai trò",
        },
        {
            action: "create",
            resource: "role",
            description: "Tạo vai trò mới",
        },
        {
            action: "update",
            resource: "role",
            description: "Cập nhật tên, mô tả vai trò",
        },
        {
            action: "delete",
            resource: "role",
            description: "Xoá vai trò",
        },
        {
            action: "assign-permission",
            resource: "role",
            description: "Gán hoặc bỏ quyền cho vai trò",
        },

        // ————————————————————————
        // 🔐 PERMISSION
        // ————————————————————————
        {
            action: "read",
            resource: "permission",
            description: "Xem danh sách quyền hệ thống",
        },
        {
            action: "create",
            resource: "permission",
            description: "Tạo quyền mới (chỉ admin hệ thống)",
        },
        {
            action: "update",
            resource: "permission",
            description: "Cập nhật quyền",
        },
        {
            action: "delete",
            resource: "permission",
            description: "Xoá quyền",
        },

        // ————————————————————————
        // 📄 CONTENT-TYPE (Schema)
        // ————————————————————————
        {
            action: "read",
            resource: "content-type",
            description: "Xem danh sách và cấu trúc loại nội dung",
        },
        {
            action: "create",
            resource: "content-type",
            description: "Tạo loại nội dung mới (ví dụ: Blog, FAQ)",
        },
        {
            action: "update",
            resource: "content-type",
            description: "Chỉnh sửa field, schema của loại nội dung",
        },
        {
            action: "delete",
            resource: "content-type",
            description: "Xoá loại nội dung",
        },

        // ————————————————————————
        // 🧩 CONTENT-ENTRY (Dữ liệu thực tế)
        // ————————————————————————
        {
            action: "read",
            resource: "content-entry",
            description: "Xem danh sách và chi tiết bản ghi nội dung",
        },
        {
            action: "create",
            resource: "content-entry",
            description: "Tạo bản ghi mới trong loại nội dung",
        },
        {
            action: "update",
            resource: "content-entry",
            description: "Chỉnh sửa bản ghi nội dung",
        },
        {
            action: "delete",
            resource: "content-entry",
            description: "Xoá bản ghi nội dung",
        },
        {
            action: "export",
            resource: "content-entry",
            description: "Xuất dữ liệu nội dung ra file (Excel, CSV)",
        },

        // ————————————————————————
        // 🖥️ PAGE (Cấu hình giao diện quản trị)
        // ————————————————————————
        {
            action: "read",
            resource: "page",
            description: "Xem cấu hình trang quản trị",
        },
        {
            action: "create",
            resource: "page",
            description: "Tạo trang quản trị mới",
        },
        {
            action: "update",
            resource: "page",
            description: "Chỉnh sửa cấu hình giao diện trang",
        },
        {
            action: "delete",
            resource: "page",
            description: "Xoá trang cấu hình",
        },

        // ————————————————————————
        // 📁 FILE (Upload)
        // ————————————————————————
        {
            action: "read",
            resource: "file",
            description: "Xem danh sách file đã upload",
        },
        {
            action: "create",
            resource: "file",
            description: "Upload file mới (hình ảnh, tài liệu)",
        },
        {
            action: "delete",
            resource: "file",
            description: "Xoá file",
        },
    ];

    try {
        // 🔥 Xoá toàn bộ permission cũ
        await Permission.destroy({});
        sails.log("🧹 Đã xoá toàn bộ permissions cũ.");

        // ✅ Tạo mới các permission
        const created = await Permission.createEach(permissionsToSeed).fetch();
        sails.log(`✅ Đã tạo ${created.length} permission mới.`);
    } catch (err) {
        sails.log.error("❌ Lỗi khi seed permissions:", err.message || err);
        if (err.stack) sails.log.error(err.stack);
        throw err;
    } finally {
        console.timeEnd("SeedPermissions");
    }
};
