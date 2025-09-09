module.exports = async function seedAdminPermissions() {
    console.time("SeedAdminPermissions");
    sails.log("🔧 Đang chạy seedAdminPermissions.js...");

    // Danh sách permission cơ bản cho admin panel
    const permissionsToSeed = [
        // ADMIN USERS
        ["create", "users", "Tạo người dùng mới"],
        ["read", "users", "Xem danh sách và thông tin người dùng"],
        ["update", "users", "Cập nhật thông tin người dùng"],
        ["delete", "users", "Xoá hoặc vô hiệu hoá người dùng"],

        // ADMIN ROLES
        ["create", "roles", "Tạo vai trò mới"],
        ["read", "roles", "Xem danh sách và chi tiết vai trò"],
        ["update", "roles", "Cập nhật tên, mô tả vai trò"],
        ["delete", "roles", "Xoá vai trò"],
    ];

    try {
        let createdCount = 0;
        let updatedCount = 0;

        for (const [action, resource, description] of permissionsToSeed) {
            const formatted = {
                action: `admin::${resource}.${action}`,
                subject: null, // theo yêu cầu của bạn: subject là null
                description,
                actionParameters: {},
                properties: {},
                conditions: [],
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
                // cập nhật nếu mô tả hoặc properties khác
                if (
                    existing.description !== formatted.description ||
                    JSON.stringify(existing.properties || {}) !==
                        JSON.stringify(formatted.properties) ||
                    JSON.stringify(existing.conditions || []) !==
                        JSON.stringify(formatted.conditions)
                ) {
                    await AdminPermission.updateOne({ id: existing.id }).set({
                        description: formatted.description,
                        properties: formatted.properties,
                        conditions: formatted.conditions,
                        actionParameters: formatted.actionParameters,
                    });
                    updatedCount++;
                    sails.log(`✏️ Cập nhật permission: ${formatted.action}`);
                } else {
                    sails.log(`⏩ Bỏ qua (đã tồn tại): ${formatted.action}`);
                }
            }
        }

        sails.log(
            `🎉 SeedAdminPermissions hoàn tất. Đã thêm mới ${createdCount}, cập nhật ${updatedCount} admin panel permission.`,
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
