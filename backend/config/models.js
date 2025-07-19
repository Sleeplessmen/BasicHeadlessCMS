module.exports.models = {
    // Sử dụng MongoDB thì bạn nên để schema = true để tránh lưu dữ liệu dư thừa không định nghĩa
    schema: true,

    // Với MongoDB, có thể dùng 'alter' để cập nhật tự động schema khi phát triển
    migrate: process.env.NODE_ENV === 'development' ? 'alter' : 'safe',

    // Cấu trúc id chuẩn với MongoDB
    attributes: {
        id: { type: 'string', columnName: '_id' }, // MongoDB dùng _id
        createdAt: { type: 'number', autoCreatedAt: true },
        updatedAt: { type: 'number', autoUpdatedAt: true },
    },

    // Encryption key nếu có trường nào cần mã hóa (encrypt: true)
    dataEncryptionKeys: {
        default: 'E6WWj4Ki7JmEsmcmezSxJMskPF6tg00XF3W4DSRnNlQ='
    },

    // Dọn dẹp các liên kết liên quan khi record bị xóa
    cascadeOnDestroy: true,
};
