/**
 * seedPageConfig.js
 * Tạo dữ liệu mẫu cho PageConfig
 */

module.exports = async function seedPageConfig() {
    const pageConfigs = [
        {
            name: 'Quản lý sản phẩm',
            slug: 'product-management',
            visibleForRoles: ['admin', 'manager'],
            api: {
                get: '/api/products',
                create: '/api/products',
                update: '/api/products/:id',
                delete: '/api/products/:id',
            },
            layout: {
                table: {
                    columns: [
                        { key: 'name', label: 'Tên sản phẩm' },
                        { key: 'price', label: 'Giá' },
                        { key: 'stock', label: 'Tồn kho' },
                    ],
                    // có thể override nếu muốn
                    // api: { get: '/custom-api/products' }
                },
                form: {
                    fields: [
                        { key: 'name', label: 'Tên sản phẩm', type: 'text', required: true },
                        { key: 'price', label: 'Giá', type: 'number', required: true },
                        { key: 'stock', label: 'Tồn kho', type: 'number' },
                    ],
                    // api override (nếu có thể khác api.create/update mặc định)
                },
                buttons: [
                    {
                        label: 'Làm mới sản phẩm',
                        api: '/api/products/refresh',
                        method: 'POST',
                        confirm: true,
                    }
                ]
            },
            actions: ['create', 'edit', 'delete'], // tùy chọn
        },

        {
            name: 'Quản lý người dùng',
            slug: 'user-management',
            visibleForRoles: ['admin'],
            api: {
                get: '/api/users',
                create: '/api/users',
                update: '/api/users/:id',
                delete: '/api/users/:id',
            },
            layout: {
                table: {
                    columns: [
                        { key: 'email', label: 'Email' },
                        { key: 'role', label: 'Vai trò' },
                        { key: 'status', label: 'Trạng thái' },
                    ]
                },
                form: {
                    fields: [
                        { key: 'email', label: 'Email', type: 'email', required: true },
                        { key: 'password', label: 'Mật khẩu', type: 'password', required: true },
                        { key: 'role', label: 'Vai trò', type: 'select', options: ['admin', 'manager', 'user'] },
                    ]
                },
                buttons: []
            },
            actions: ['create', 'edit', 'delete'],
        }
    ];

    try {
        const existing = await PageConfig.find();
        if (existing.length > 0) {
            await PageConfig.destroy({});
            sails.log.debug('🧹 Đã xoá toàn bộ PageConfig cũ.');
        }

        await PageConfig.createEach(pageConfigs);
        sails.log.debug('✅ Đã seed PageConfig thành công.');
    } catch (error) {
        sails.log.error('❌ Lỗi khi seed PageConfig:', error);
    }
};
