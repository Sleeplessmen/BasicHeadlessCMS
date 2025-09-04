// api/db/seeds/seedRoles.js
module.exports = async function seedRoles() {
    console.time("SeedRoles");
    sails.log("🔧 Đang chạy seedRoles.js...");

    const roleDefinitions = [
        {
            name: "Super Admin",
            code: "strapi-super-admin",
            description: "Quản trị toàn hệ thống",
            permissions: [
                // User
                ["read", "user"],
                ["create", "user"],
                ["update", "user"],
                ["delete", "user"],
                ["assign-role", "user"],

                // Role
                ["read", "role"],
                ["create", "role"],
                ["update", "role"],
                ["delete", "role"],
                ["assign-permission", "role"],

                // Permission
                ["read", "permission"],
                ["create", "permission"],
                ["update", "permission"],
                ["delete", "permission"],

                // Content Type
                ["read", "content-type"],
                ["create", "content-type"],
                ["update", "content-type"],
                ["delete", "content-type"],

                // Content Entry
                ["read", "content-entry"],
                ["create", "content-entry"],
                ["update", "content-entry"],
                ["delete", "content-entry"],
                ["export", "content-entry"],

                // Asset
                ["read", "asset"],
                ["create", "asset"],
                ["delete", "asset"],
            ],
        },
        {
            name: "Editor",
            code: "strapi-editor",
            description: "Biên tập viên nội dung",
            permissions: [
                ["read", "user"],
                ["read", "role"],
                ["read", "content-type"],

                ["read", "content-entry"],
                ["create", "content-entry"],
                ["update", "content-entry"],
                ["delete", "content-entry"],
                ["export", "content-entry"],

                ["read", "asset"],
                ["create", "asset"],
            ],
        },
        {
            name: "Author",
            code: "strapi-author",
            description: "Người dùng thông thường",
            permissions: [
                ["read", "content-entry"],
                ["read", "content-type"],
            ],
        },
    ];

    try {
        // Xoá toàn bộ role cũ (và liên kết permission)
        await AdminRole.destroy({});
        sails.log("🧹 Đã xoá toàn bộ roles cũ.");

        for (const roleDef of roleDefinitions) {
            const permissionIds = [];
            const notFound = [];

            for (const [action, resource] of roleDef.permissions) {
                const actionKey = `admin::${resource}.${action}`;
                const subjectKey = `admin::${resource}`;

                const perm = await AdminPermission.findOne({
                    action: actionKey,
                    subject: subjectKey,
                });

                if (perm) {
                    permissionIds.push(perm.id);
                } else {
                    notFound.push(actionKey);
                }
            }

            if (notFound.length > 0) {
                sails.log.warn(
                    `⚠️ Role '${roleDef.name}' thiếu ${notFound.length} permission:`,
                    notFound,
                );
            }

            const created = await AdminRole.create({
                name: roleDef.name,
                code: roleDef.code,
                description: roleDef.description,
            }).fetch();

            if (permissionIds.length > 0) {
                await AdminRole.addToCollection(
                    created.id,
                    "permissions",
                ).members(permissionIds);
            }

            sails.log(
                `✅ Tạo role '${created.name}' (${created.code}) với ${permissionIds.length}/${roleDef.permissions.length} quyền.`,
            );
        }

        sails.log("🎉 Hoàn tất seed roles.");
    } catch (err) {
        sails.log.error("❌ Lỗi khi seed roles:", err.message || err);
        throw err;
    } finally {
        console.timeEnd("SeedRoles");
    }
};
