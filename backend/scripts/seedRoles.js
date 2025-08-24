// api/data/seedRoles.js

module.exports = async function seedRoles() {
    console.time("SeedRoles");
    sails.log("🔧 Đang chạy seedRoles.js...");

    // Định nghĩa role và danh sách permission theo (action + resource)
    const rolePermissions = [
        {
            name: "admin",
            description: "Quản trị toàn hệ thống",
            permissions: [
                // Auth
                { action: "read", resource: "user" },
                { action: "create", resource: "user" },
                { action: "update", resource: "user" },
                { action: "delete", resource: "user" },
                { action: "assign-role", resource: "user" },

                { action: "read", resource: "role" },
                { action: "create", resource: "role" },
                { action: "update", resource: "role" },
                { action: "delete", resource: "role" },
                { action: "assign-permission", resource: "role" },

                { action: "read", resource: "permission" },
                { action: "create", resource: "permission" },
                { action: "update", resource: "permission" },
                { action: "delete", resource: "permission" },

                { action: "read", resource: "content-type" },
                { action: "create", resource: "content-type" },
                { action: "update", resource: "content-type" },
                { action: "delete", resource: "content-type" },

                { action: "read", resource: "content-entry" },
                { action: "create", resource: "content-entry" },
                { action: "update", resource: "content-entry" },
                { action: "delete", resource: "content-entry" },
                { action: "export", resource: "content-entry" },

                { action: "read", resource: "page" },
                { action: "create", resource: "page" },
                { action: "update", resource: "page" },
                { action: "delete", resource: "page" },

                { action: "read", resource: "file" },
                { action: "create", resource: "file" },
                { action: "delete", resource: "file" },
            ],
        },
        {
            name: "editor",
            description: "Biên tập viên nội dung",
            permissions: [
                { action: "read", resource: "user" },
                { action: "read", resource: "role" },
                { action: "read", resource: "content-type" },
                { action: "read", resource: "page" },

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
            name: "user",
            description: "Người dùng thông thường",
            permissions: [
                { action: "read", resource: "content-entry" },
                { action: "read", resource: "content-type" },
            ],
        },
    ];

    try {
        // 🔥 Xóa toàn bộ role cũ (sẽ tự động xóa liên kết với permission)
        await Role.destroy({});
        sails.log("🧹 Đã xoá toàn bộ roles cũ.");

        // 🔁 Tạo từng role
        for (const roleDef of rolePermissions) {
            // Tìm các permission theo action + resource
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

            // Tạo role và gán permission qua collection
            const createdRole = await Role.create({
                name: roleDef.name,
                description: roleDef.description,
                permissions: permissionIds,
            }).fetch();

            sails.log(
                `✅ Tạo role '${createdRole.name}' với ${permissionIds.length}/${roleDef.permissions.length} quyền.`
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
