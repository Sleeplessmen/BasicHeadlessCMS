/**
 * scripts/seedUsers.js
 *
 * @description :: Seed người dùng mẫu, bao gồm admin, editor và 50 user thường.
 */

const bcrypt = require('bcryptjs');

module.exports = async function () {
    console.time('SeedUsers');
    sails.log('🔧 Đang chạy seedUsers.js...');

    try {
        // B1. Lấy các role cần thiết
        const roles = await Role.find({ name: ['admin', 'editor', 'user'] });

        const roleMap = roles.reduce((map, role) => {
            map[role.name] = role.id;
            return map;
        }, {});

        // B2. Đảm bảo role tồn tại đầy đủ
        ['admin', 'editor', 'user'].forEach(roleName => {
            if (!roleMap[roleName]) {
                throw new Error(`❌ Role '${roleName}' chưa tồn tại. Hãy chạy seedRoles.js trước.`);
            }
        });

        const { admin, editor, user } = roleMap;

        // B3. Hash mật khẩu (dùng chung cho tất cả)
        const hashedPassword = await bcrypt.hash('123456', 10);

        // B4. Tạo admin/editor nếu chưa có
        const usersToSeed = [
            { email: 'admin@example.com', role: admin },
            { email: 'editor@example.com', role: editor },
            ...Array.from({ length: 50 }, (_, i) => ({
                email: `user${i + 1}@example.com`,
                role: user
            }))
        ];



        // B5. Tìm các user đã tồn tại
        const existingUsers = await User.find({
            email: usersToSeed.map(u => u.email)
        }).select(['email']);

        const existingEmails = new Set(existingUsers.map(u => u.email));

        // B6. Lọc user chưa có
        const newUsers = usersToSeed
            .filter(u => !existingEmails.has(u.email))
            .map(u => ({
                email: u.email,
                password: hashedPassword,
                role: u.role
            }));

        if (newUsers.length > 0) {
            const created = await User.createEach(newUsers).fetch();
            sails.log(`✅ Đã tạo ${created.length} user mới`);
        } else {
            sails.log('ℹ️ Tất cả người dùng đã tồn tại.');
        }

    } catch (err) {
        sails.log.error('❌ Lỗi khi seed user:', err.stack || err.message);
        throw err;
    }

    console.timeEnd('SeedUsers');
};
