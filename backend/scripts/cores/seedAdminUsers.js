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
                        `❌ Role '${code}' chưa tồn tại. Hãy chạy seedRoles.js trước.`,
                    );
                }
            },
        );

        const superAdminRoleId = roleMap["strapi-super-admin"];
        const editorRoleId = roleMap["strapi-editor"];
        const authorRoleId = roleMap["strapi-author"];

        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash("123456", 10);

        // Danh sách người dùng cần tạo
        const usersToSeed = [
            {
                firstname: "System",
                lastname: "Admin",
                username: "admin",
                email: "admin@example.com",
                roles: [superAdminRoleId],
                isActive: true,
            },
            {
                firstname: "Content",
                lastname: "Editor",
                username: "editor",
                email: "editor@example.com",
                roles: [editorRoleId],
                isActive: true,
            },
            // Tạo 50 user thường (author)
            ...Array.from({ length: 50 }, (_, i) => ({
                firstname: "User",
                lastname: `${i + 1}`,
                username: `user${i + 1}`,
                email: `user${i + 1}@example.com`,
                roles: [authorRoleId],
                isActive: true,
            })),
        ];

        // Kiểm tra user đã tồn tại
        const existingUsers = await AdminUser.find({
            where: { email: usersToSeed.map((u) => u.email) },
            select: ["email"],
        });

        const existingEmails = new Set(existingUsers.map((u) => u.email));

        // Lọc các user chưa tồn tại
        const newUsers = usersToSeed
            .filter((u) => !existingEmails.has(u.email))
            .map((u) => ({
                ...u,
                password: hashedPassword,
                blocked: false,
                // resetPasswordToken: null,
                // registrationToken: null,
            }));

        // Tạo user mới
        if (newUsers.length > 0) {
            const created = await AdminUser.createEach(newUsers).fetch();
            sails.log(`✅ Đã tạo ${created.length} admin panel users mới.`);
        } else {
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
