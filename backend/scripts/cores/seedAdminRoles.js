module.exports = async function SeedAdminRoles() {
    console.time("SeedAdminRoles");
    sails.log("🔧 Đang chạy SeedAdminRoles.js...");

    const roleDefinitions = [
        {
            name: "Super Admin",
            code: "strapi-super-admin",
            description:
                "Super Admins can access and manage all features and settings.",
            permissions: [
                // ADMIN USERS
                ["read", "users"],
                ["create", "users"],
                ["update", "users"],
                ["delete", "users"],

                // ADMIN ROLES
                ["read", "roles"],
                ["create", "roles"],
                ["update", "roles"],
                ["delete", "roles"],

                // ADMIN PERMISSIONS
                // ["read", "permissions"],
            ],
        },
        {
            name: "Editor",
            code: "strapi-editor",
            description:
                "Editors can manage and publish contents including those of other users.",
            permissions: [],
        },
        {
            name: "Author",
            code: "strapi-author",
            description: "Authors can manage the content they have created.",
            permissions: [],
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

                const perm = await AdminPermission.findOne({
                    action: actionKey,
                    subject: null, // đồng bộ với seed AdminPermission
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
                createdAt: Date.now(),
                updatedAt: Date.now(),
                publishedAt: null,
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

        sails.log("🎉 Hoàn tất seed admin panel roles.");
    } catch (err) {
        sails.log.error(
            "❌ Lỗi khi seed admin panel roles:",
            err.message || err,
        );
        throw err;
    } finally {
        console.timeEnd("SeedAdminRoles");
    }
};
