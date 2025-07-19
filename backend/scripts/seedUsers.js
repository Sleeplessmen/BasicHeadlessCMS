const bcrypt = require('bcryptjs');
const User = require('../api/mongoose-models/User');
const Role = require('../api/mongoose-models/Role');

module.exports = async function () {
    console.time('SeedUsers');
    sails.log('🔧 Đang chạy seedUsers.js...');

    try {
        // B1. Lấy các role cần thiết
        const roles = await Role.find({ name: { $in: ['admin', 'editor', 'user'] } });
        const roleMap = roles.reduce((map, role) => {
            map[role.name] = role._id;
            return map;
        }, {});

        const { admin, editor, user } = roleMap;

        if (!admin || !editor || !user) {
            throw new Error('❌ Role admin/editor/user chưa tồn tại. Hãy chạy seedRoles trước.');
        }

        // B2. Xoá user trừ admin/editor
        const deleted = await User.deleteMany({
            email: { $nin: ['admin@example.com', 'editor@example.com'] },
        });
        sails.log(`🧹 Đã xoá ${deleted.deletedCount} user thường`);

        // B3. Hash mật khẩu dùng lại
        const hashedPassword = await bcrypt.hash('123456', 10);

        // B4. Hàm tạo user nếu chưa tồn tại
        const createIfNotExist = async (email, roleId) => {
            const exists = await User.findOne({ email });
            if (!exists) {
                await User.create({ email, password: hashedPassword, role: roleId });
                sails.log(`✅ Đã tạo user: ${email}`);
            } else {
                sails.log(`ℹ️ Đã tồn tại user: ${email}`);
            }
        };

        await createIfNotExist('admin@example.com', admin);
        await createIfNotExist('editor@example.com', editor);

        // B5. Tạo 50 user thường
        const users = Array.from({ length: 50 }, (_, i) => ({
            email: `user${i + 1}@example.com`,
            password: hashedPassword,
            role: user
        }));
        await User.insertMany(users);
        sails.log('✅ Đã tạo 50 user thường');

    } catch (err) {
        sails.log.error('❌ Lỗi khi seed user:', err.stack || err.message);
        throw err;
    }

    console.timeEnd('SeedUsers');
};
