const bcrypt = require("bcryptjs");

module.exports = async function seedAdminUsers() {
    console.time("SeedAdminUsers");
    sails.log("🔧 Đang chạy seedAdminUsers.js...");

    try {
        // Lấy các role cần thiết dựa vào code
        const roles = await AdminRole.find({
            where: {
                code: ["strapi-super-admin", "strapi-editor", "strapi-author"],
            },
            select: ["id", "name", "code"],
        });

        const roleMap = roles.reduce((map, role) => {
            map[role.code] = role.id;
            return map;
        }, {});

        // Đảm bảo các role tồn tại
        ["strapi-super-admin", "strapi-editor", "strapi-author"].forEach(
            (code) => {
                if (!roleMap[code]) {
                    throw new Error(
                        `❌ Role '${code}' chưa tồn tại. Hãy chạy SeedAdminRoles.js trước.`,
                    );
                }
            },
        );

        const superAdminRoleId = roleMap["strapi-super-admin"];
        const editorRoleId = roleMap["strapi-editor"];
        const authorRoleId = roleMap["strapi-author"];

        const hashedPassword = await bcrypt.hash("123456", 10);

        // Danh sách người dùng cần tạo
        const usersToSeed = [
            {
                firstname: "System",
                lastname: "Admin",
                username: "admin",
                email: "admin@example.com",
                roleIds: [superAdminRoleId],
            },
            {
                firstname: "Content",
                lastname: "Editor",
                username: "editor",
                email: "editor@example.com",
                roleIds: [editorRoleId],
            },
            // Tạo 10 author
            ...Array.from({ length: 10 }, (_, i) => ({
                firstname: "User",
                lastname: `${i + 1}`,
                username: `user${i + 1}`,
                email: `user${i + 1}@example.com`,
                roleIds: [authorRoleId],
            })),
        ];

        // Kiểm tra user đã tồn tại
        const existingUsers = await AdminUser.find({
            where: { email: usersToSeed.map((u) => u.email) },
            select: ["id", "email"],
        });

        const existingEmails = new Set(existingUsers.map((u) => u.email));

        // Lọc user chưa tồn tại
        const newUsers = usersToSeed.filter(
            (u) => !existingEmails.has(u.email),
        );

        // Tạo user mới
        for (const u of newUsers) {
            const created = await AdminUser.create({
                firstname: u.firstname,
                lastname: u.lastname,
                username: u.username,
                email: u.email,
                password: hashedPassword,
                isActive: true,
                blocked: false,
            }).fetch();

            if (u.roleIds?.length) {
                await AdminUser.addToCollection(created.id, "roles").members(
                    u.roleIds,
                );
            }

            sails.log(
                `✅ Đã tạo user '${u.email}' với role(s): ${u.roleIds.join(",")}`,
            );
        }

        if (newUsers.length === 0) {
            sails.log(
                "ℹ️ Tất cả admin panel users đã tồn tại, không cần tạo thêm.",
            );
        }
    } catch (err) {
        sails.log.error(
            "❌ Lỗi khi seed admin panel users:",
            err.message || err,
        );
        if (err.stack) sails.log.error(err.stack);
        throw err;
    } finally {
        console.timeEnd("SeedAdminUsers");
    }
};
