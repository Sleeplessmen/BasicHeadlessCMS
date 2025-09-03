module.exports = async function seedPermissions() {
    console.time("SeedPermissions");
    sails.log("🔧 Đang chạy seedPermissions.js...");

    const permissionsToSeed = [
        // USER
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

        // ROLE
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

        // PERMISSION
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
        { action: "delete", resource: "permission", description: "Xoá quyền" },

        // CONTENT-TYPE
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

        // CONTENT-ENTRY
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

        // ASSET
        {
            action: "read",
            resource: "asset",
            description: "Xem danh sách file đã upload",
        },
        {
            action: "create",
            resource: "asset",
            description: "Upload file mới (hình ảnh, tài liệu)",
        },
        { action: "delete", resource: "asset", description: "Xoá file" },
    ];

    try {
        let createdCount = 0;
        for (let p of permissionsToSeed) {
            const formatted = {
                action: `admin::${p.resource}.${p.action}`,
                subject: `admin::${p.resource}`,
                description: p.description,
            };

            const existing = await AdminPermission.findOne({
                action: formatted.action,
                subject: formatted.subject,
            });

            if (!existing) {
                await AdminPermission.create(formatted);
                createdCount++;
                sails.log(`✅ Tạo mới permission: ${formatted.action}`);
            } else {
                if (existing.description !== formatted.description) {
                    await AdminPermission.updateOne({ id: existing.id }).set({
                        description: formatted.description,
                    });
                    sails.log(
                        `✏️ Cập nhật mô tả cho permission: ${formatted.action}`,
                    );
                } else {
                    sails.log(`⏩ Bỏ qua (đã tồn tại): ${formatted.action}`);
                }
            }
        }

        sails.log(
            `🎉 SeedPermissions hoàn tất. Đã thêm mới ${createdCount} permission.`,
        );
    } catch (err) {
        sails.log.error("❌ Lỗi khi seed permissions:", err.message || err);
        throw err;
    } finally {
        console.timeEnd("SeedPermissions");
    }
};
