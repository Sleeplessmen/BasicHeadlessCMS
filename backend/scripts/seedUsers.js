const bcrypt = require('bcryptjs');
const User = require('../api/mongoose-models/User');
const Role = require('../api/mongoose-models/Role');

module.exports = async function () {
    console.time('SeedUsers');
    sails.log('🔧 Đang chạy seedUsers.js...');

    try {
        // 1. Lấy role từ DB
        const [adminRole, editorRole, userRole] = await Promise.all([
            Role.findOne({ name: 'admin' }),
            Role.findOne({ name: 'editor' }),
            Role.findOne({ name: 'user' }),
        ]);

        if (!adminRole || !editorRole || !userRole) {
            throw new Error('❌ Role admin/editor/user chưa tồn tại. Hãy seed roles trước.');
        }

        // 2. Xoá toàn bộ user ngoại trừ admin/editor
        const deleted = await User.deleteMany({
            email: { $nin: ['admin@example.com', 'editor@example.com'] },
        });
        sails.log(`🧹 Đã xoá ${deleted.deletedCount} user thường`);

        // 3. Hash mật khẩu dùng lại
        const passwordHashed = await bcrypt.hash('123456', 10);

        // 4. Tạo admin nếu chưa có
        const adminEmail = 'admin@example.com';
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
            await User.create({
                email: adminEmail,
                password: passwordHashed,
                role: adminRole._id,
            });
            sails.log(`✅ Đã tạo admin: ${adminEmail}`);
        } else {
            sails.log(`ℹ️ Admin đã tồn tại: ${adminEmail}`);
        }

        // 5. Tạo editor nếu chưa có
        const editorEmail = 'editor@example.com';
        const existingEditor = await User.findOne({ email: editorEmail });
        if (!existingEditor) {
            await User.create({
                email: editorEmail,
                password: passwordHashed,
                role: editorRole._id,
            });
            sails.log(`✅ Đã tạo editor: ${editorEmail}`);
        } else {
            sails.log(`ℹ️ Editor đã tồn tại: ${editorEmail}`);
        }

        // 6. Tạo 50 user thường
        const users = Array.from({ length: 50 }, (_, i) => ({
            email: `user${i + 1}@example.com`,
            password: passwordHashed,
            role: userRole._id,
        }));

        await User.insertMany(users);
        sails.log('✅ Đã tạo 50 user thường');

    } catch (err) {
        sails.log.error('❌ Lỗi khi seed user:', err.stack || err.message);
    }

    console.timeEnd('SeedUsers');
};
