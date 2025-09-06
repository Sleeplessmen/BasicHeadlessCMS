// module.exports = {
//     datastores: {
//         default: {
//             adapter: "sails-mongo",
//             url: process.env.MONGO_URI, // MongoDB URI từ env, bắt buộc set
//             // Nếu MongoDB Atlas dùng self-signed cert, mở comment ssl
//             // ssl: { rejectUnauthorized: false },
//         },
//     },

//     models: {
//         migrate: "safe", // Không tự động alter schema, tránh mất dữ liệu
//         schema: true, // Chỉ lưu các field định nghĩa trong model
//     },

//     blueprints: {
//         shortcuts: false, // production không expose shortcuts
//         actions: false,
//         rest: false,
//     },

//     security: {
//         cors: {
//             allowOrigins: (process.env.CORS_ALLOWED_ORIGINS || "")
//                 .split(",")
//                 .filter(Boolean),
//             allowCredentials: true,
//         },
//         // CSRF nên bật trong config/security.js nếu cần
//     },

//     log: {
//         level: "warn", // production log ít hơn, chỉ warn & error
//     },

//     http: {
//         trustProxy: true, // quan trọng khi deploy qua proxy (Heroku, Render, Nginx)
//         cache: 365.25 * 24 * 60 * 60 * 1000, // 1 năm cache static assets
//     },

//     custom: {
//         baseUrl: process.env.BASE_URL || "https://yourdomain.com",
//         internalEmailAddress:
//             process.env.INTERNAL_EMAIL || "support@yourdomain.com",
//         jwtSecret: process.env.JWT_SECRET, // JWT secret production
//         dataEncryptionKey: process.env.DATA_ENCRYPTION_KEY, // key encrypt dữ liệu
//     },
// };
