const PageConfig = require('../api/mongoose-models/PageConfig');

module.exports = async function () {
    console.time('SeedPageConfigs');
    sails.log('🔧 Đang chạy seedPageConfigs.js...');

    const pages = [
        {
            name: 'Quản lý sản phẩm',
            slug: 'product-management',
            visibleForRoles: ['admin', 'editor'],

            layout: {
                table: {
                    columns: [
                        { key: 'name', label: 'Tên sản phẩm', type: 'text', sortable: true, searchable: true },
                        { key: 'price', label: 'Giá', type: 'number', sortable: true, searchable: false },
                        { key: 'createdAt', label: 'Ngày tạo', type: 'date', sortable: true, searchable: false }
                    ]
                },
                form: {
                    fields: [
                        { key: 'name', label: 'Tên sản phẩm', type: 'text', required: true },
                        { key: 'price', label: 'Giá bán', type: 'number', required: true, defaultValue: 0 },
                        { key: 'category', label: 'Danh mục', type: 'select', required: false, options: ['Thời trang', 'Đồ gia dụng', 'Công nghệ'] }
                    ]
                }
            },

            api: {
                get: '/api/v1/products',
                create: '/api/v1/products',
                update: '/api/v1/products/:id',
                delete: '/api/v1/products/:id'
            },

            actions: [
                { label: 'Xuất Excel', type: 'button', method: 'GET', endpoint: '/api/v1/products/export', confirm: false },
                { label: 'Xoá nhiều', type: 'button', method: 'DELETE', endpoint: '/api/v1/products/bulk-delete', confirm: true }
            ]
        },

        {
            name: 'Quản lý người dùng',
            slug: 'user-management',
            visibleForRoles: ['admin'],

            layout: {
                table: {
                    columns: [
                        { key: 'email', label: 'Email', type: 'text', sortable: true, searchable: true },
                        { key: 'role', label: 'Vai trò', type: 'text', sortable: true, searchable: false },
                        { key: 'createdAt', label: 'Ngày tạo', type: 'date', sortable: true, searchable: false }
                    ]
                },
                form: {
                    fields: [
                        { key: 'email', label: 'Email người dùng', type: 'text', required: true },
                        { key: 'role', label: 'Vai trò', type: 'select', required: true, options: ['admin', 'editor', 'viewer'] }
                    ]
                }
            },

            api: {
                get: '/api/v1/users',
                create: '/api/v1/users',
                update: '/api/v1/users/:id',
                delete: '/api/v1/users/:id'
            },

            actions: [
                { label: 'Reset mật khẩu', type: 'button', method: 'POST', endpoint: '/api/v1/users/:id/reset-password', confirm: true }
            ]
        }
    ];

    try {
        await PageConfig.deleteMany({});
        sails.log('🧹 Đã xoá toàn bộ PageConfig cũ');

        const created = await PageConfig.insertMany(pages);
        sails.log(`✅ Đã tạo ${created.length} PageConfig`);
    } catch (err) {
        sails.log.error('❌ Lỗi khi seed PageConfig:', err.stack || err.message);
        throw err;
    }

    console.timeEnd('SeedPageConfigs');
};
