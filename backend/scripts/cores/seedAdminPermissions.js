module.exports = async function seedAdminPermissions() {
    console.time("SeedAdminPermissions");
    sails.log("🔧 Đang chạy seedAdminPermissions.js...");

    const permissionsToSeed = [
        // ADMIN USERS
        ["read", "user", "Xem danh sách và thông tin người dùng"],
        ["create", "user", "Tạo người dùng mới"],
        ["update", "user", "Cập nhật thông tin người dùng"],
        ["delete", "user", "Xoá hoặc vô hiệu hoá người dùng"],

        // ADMIN ROLES
        ["read", "role", "Xem danh sách và chi tiết vai trò"],
        ["create", "role", "Tạo vai trò mới"],
        ["update", "role", "Cập nhật tên, mô tả vai trò"],
        ["delete", "role", "Xoá vai trò"],

        // ADMIN PERMISSIONS
        ["read", "permission", "Xem danh sách quyền hệ thống"],

        // // CONTENT-TYPE
        // ["read", "content-type", "Xem danh sách và cấu trúc loại nội dung"],
        // ["create", "content-type", "Tạo loại nội dung mới (ví dụ: Blog, FAQ)"],
        // ["update", "content-type", "Chỉnh sửa field, schema của loại nội dung"],
        // ["delete", "content-type", "Xoá loại nội dung"],

        // // CONTENT-ENTRY
        // ["read", "content-entry", "Xem danh sách và chi tiết bản ghi nội dung"],
        // ["create", "content-entry", "Tạo bản ghi mới trong loại nội dung"],
        // ["update", "content-entry", "Chỉnh sửa bản ghi nội dung"],
        // ["delete", "content-entry", "Xoá bản ghi nội dung"],
        // [
        //     "export",
        //     "content-entry",
        //     "Xuất dữ liệu nội dung ra file (Excel, CSV)",
        // ],

        // // ASSET
        // ["read", "asset", "Xem danh sách file đã upload"],
        // ["create", "asset", "Upload file mới (hình ảnh, tài liệu)"],
        // ["delete", "asset", "Xoá file"],
    ];

    try {
        let createdCount = 0;

        for (const [action, resource, description] of permissionsToSeed) {
            const formatted = {
                action: `admin::${resource}.${action}`,
                subject: `admin::${resource}`,
                description,
            };

            const existing = await AdminPermission.findOne({
                action: formatted.action,
                subject: formatted.subject,
            });

            if (!existing) {
                await AdminPermission.create(formatted);
                createdCount++;
                sails.log(`✅ Tạo mới permission: ${formatted.action}`);
            } else if (existing.description !== formatted.description) {
                await AdminPermission.updateOne({ id: existing.id }).set({
                    description: formatted.description,
                });
                sails.log(`✏️ Cập nhật mô tả: ${formatted.action}`);
            } else {
                sails.log(`⏩ Bỏ qua (đã tồn tại): ${formatted.action}`);
            }
        }

        sails.log(
            `🎉 SeedAdminPermissions hoàn tất. Đã thêm mới ${createdCount} admin panel permission.`,
        );
    } catch (err) {
        sails.log.error(
            "❌ Lỗi khi seed admin panel permissions:",
            err.message || err,
        );
        throw err;
    } finally {
        console.timeEnd("SeedAdminPermissions");
    }
};
