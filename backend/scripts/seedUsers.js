const bcrypt = require("bcryptjs");

module.exports = async function seedUsers() {
    console.time("SeedUsers");
    sails.log("🔧 Đang chạy seedUsers.js...");

    try {
        // B1. Lấy các role cần thiết
        const roles = await Role.find({
            where: { type: ["super-admin", "editor", "author"] },
            select: ["id", "name", "type"],
        });

        const roleMap = roles.reduce((map, role) => {
            map[role.type] = role.id;
            return map;
        }, {});

        // B2. Đảm bảo các role tồn tại
        ["super-admin", "editor", "author"].forEach((roleType) => {
            if (!roleMap[roleType]) {
                throw new Error(
                    `❌ Role '${roleType}' chưa tồn tại. Hãy chạy seedRoles.js trước.`
                );
            }
        });

        const {
            "super-admin": superAdminRoleId,
            editor: editorRoleId,
            author: authorRoleId,
        } = roleMap;

        // B3. Hash mật khẩu
        const hashedPassword = await bcrypt.hash("123456", 10);

        // B4. Danh sách người dùng cần tạo
        const usersToSeed = [
            {
                email: "admin@example.com",
                fullName: "System Super Admin",
                roles: [superAdminRoleId],
                isActive: true,
            },
            {
                email: "editor@example.com",
                fullName: "Content Editor",
                roles: [editorRoleId],
                isActive: true,
            },
            // Tạo 50 user thường (author)
            ...Array.from({ length: 50 }, (_, i) => ({
                email: `user${i + 1}@example.com`,
                fullName: `Người dùng ${i + 1}`,
                roles: [authorRoleId],
                isActive: true,
            })),
        ];

        // B5. Kiểm tra user đã tồn tại
        const existingUsers = await User.find({
            where: { email: usersToSeed.map((u) => u.email) },
            select: ["email"],
        });

        const existingEmails = new Set(existingUsers.map((u) => u.email));

        // B6. Lọc các user chưa tồn tại
        const newUsers = usersToSeed
            .filter((u) => !existingEmails.has(u.email))
            .map((u) => ({
                email: u.email,
                password: hashedPassword,
                fullName: u.fullName,
                roles: u.roles, // ← mảng role
                isActive: u.isActive,
            }));

        // B7. Tạo user mới
        if (newUsers.length > 0) {
            const created = await User.createEach(newUsers).fetch();
            sails.log(`✅ Đã tạo ${created.length} người dùng mới.`);
        } else {
            sails.log("ℹ️ Tất cả người dùng đã tồn tại, không cần tạo thêm.");
        }
    } catch (err) {
        sails.log.error("❌ Lỗi khi seed user:", err.message || err);
        if (err.stack) sails.log.error(err.stack);
        throw err;
    } finally {
        console.timeEnd("SeedUsers");
    }
};
