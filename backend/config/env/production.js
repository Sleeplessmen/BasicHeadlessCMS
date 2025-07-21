module.exports = {

    datastores: {
        default: {
            // Lấy URI MongoDB từ biến môi trường
            url: process.env.MONGO_URI,
            // Nếu MongoDB cần SSL, cấu hình thêm ở đây
            // ssl: { rejectUnauthorized: false },
        },
    },

    models: {
        migrate: 'safe', // production không tự động migrate tránh mất data
    },

    blueprints: {
        shortcuts: false,
        actions: false,
        rest: false,
    },

    security: {
        cors: {
            allowOrigins: (process.env.CORS_ALLOWED_ORIGINS || '').split(',').filter(Boolean),
            allowCredentials: true,
        },
        // Bật CSRF trong config/security.js (không cấu hình ở đây)
    },


    log: {
        level: 'info',
    },

    http: {
        trustProxy: true,  // quan trọng khi deploy qua proxy như Render, Heroku
        cache: 365.25 * 24 * 60 * 60 * 1000, // 1 năm cache static assets
    },

    custom: {
        baseUrl: process.env.BASE_URL || 'https://yourdomain.com',
        internalEmailAddress: process.env.INTERNAL_EMAIL || 'support@yourdomain.com',
    },

};
