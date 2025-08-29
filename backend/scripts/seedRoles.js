module.exports = async function seedRoles() {
    console.time("SeedRoles");
    sails.log("🔧 Đang chạy seedRoles.js...");

    // Định nghĩa role và danh sách permission theo (action + resource)
    const roleDefinitions = [
        {
            name: "Super Admin",
            description: "Quản trị toàn hệ thống",
            type: "super-admin",
            permissions: [
                // User
                { action: "read", resource: "user" },
                { action: "create", resource: "user" },
                { action: "update", resource: "user" },
                { action: "delete", resource: "user" },
                { action: "assign-role", resource: "user" },

                // Role
                { action: "read", resource: "role" },
                { action: "create", resource: "role" },
                { action: "update", resource: "role" },
                { action: "delete", resource: "role" },
                { action: "assign-permission", resource: "role" },

                // Permission
                { action: "read", resource: "permission" },
                { action: "create", resource: "permission" },
                { action: "update", resource: "permission" },
                { action: "delete", resource: "permission" },

                // Content Type
                { action: "read", resource: "content-type" },
                { action: "create", resource: "content-type" },
                { action: "update", resource: "content-type" },
                { action: "delete", resource: "content-type" },

                // Content Entry
                { action: "read", resource: "content-entry" },
                { action: "create", resource: "content-entry" },
                { action: "update", resource: "content-entry" },
                { action: "delete", resource: "content-entry" },
                { action: "export", resource: "content-entry" },

                // File
                { action: "read", resource: "file" },
                { action: "create", resource: "file" },
                { action: "delete", resource: "file" },
            ],
        },
        {
            name: "Editor",
            description: "Biên tập viên nội dung",
            type: "editor",
            permissions: [
                { action: "read", resource: "user" },
                { action: "read", resource: "role" },
                { action: "read", resource: "content-type" },

                { action: "read", resource: "content-entry" },
                { action: "create", resource: "content-entry" },
                { action: "update", resource: "content-entry" },
                { action: "delete", resource: "content-entry" },
                { action: "export", resource: "content-entry" },

                { action: "read", resource: "file" },
                { action: "create", resource: "file" },
            ],
        },
        {
            name: "Author",
            description: "Người dùng thông thường",
            type: "author",
            permissions: [
                { action: "read", resource: "content-entry" },
                { action: "read", resource: "content-type" },
            ],
        },
    ];

    try {
        // 🔥 Xóa toàn bộ role cũ (cùng liên kết permission)
        await Role.destroy({});
        sails.log("🧹 Đã xoá toàn bộ roles cũ.");

        // 🔁 Tạo từng role
        for (const roleDef of roleDefinitions) {
            const permissionIds = [];
            const notFound = [];

            for (const perm of roleDef.permissions) {
                const found = await Permission.findOne({
                    action: perm.action,
                    resource: perm.resource,
                });

                if (found) {
                    permissionIds.push(found.id);
                } else {
                    notFound.push(`${perm.action}:${perm.resource}`);
                }
            }

            if (notFound.length > 0) {
                sails.log.warn(
                    `⚠️ Không tìm thấy permission cho role '${roleDef.name}':`,
                    notFound
                );
            }

            // 👉 Tạo role kèm type
            const createdRole = await Role.create({
                name: roleDef.name,
                description: roleDef.description,
                type: roleDef.type,
                permissions: permissionIds,
            }).fetch();

            sails.log(
                `✅ Tạo role '${createdRole.name}' (${createdRole.type}) với ${permissionIds.length}/${roleDef.permissions.length} quyền.`
            );
        }

        sails.log("🎉 Hoàn tất seed roles.");
    } catch (err) {
        sails.log.error("❌ Lỗi khi seed roles:", err.message || err);
        if (err.stack) sails.log.error(err.stack);
        throw err;
    } finally {
        console.timeEnd("SeedRoles");
    }
};
