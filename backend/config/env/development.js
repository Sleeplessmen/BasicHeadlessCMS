// module.exports = {
//     datastores: {
//         default: {
//             adapter: "sails-mongo",
//             url: process.env.MONGO_URI || "mongodb://localhost:27017/dev_db", // fallback nếu env chưa set
//             // Nếu MongoDB cần SSL (Atlas) có thể mở comment
//             // ssl: { rejectUnauthorized: false },
//         },
//     },

//     models: {
//         schema: true,
//         migrate: "alter", // Tự động cập nhật schema khi dev
//         attributes: {
//             id: { type: "string", columnName: "_id" },
//             createdAt: { type: "number", autoCreatedAt: true },
//             updatedAt: { type: "number", autoUpdatedAt: true },
//         },
//         dataEncryptionKeys: {
//             default:
//                 process.env.DATA_ENCRYPTION_KEY || "dev_local_key_1234567890", // fallback key dev
//         },
//         cascadeOnDestroy: true, // Dev có thể xóa liên kết dễ dàng
//     },

//     blueprints: {
//         shortcuts: true, // Dev có thể dùng shortcuts
//         actions: true,
//         rest: true,
//     },

//     security: {
//         cors: {
//             allowOrigins: (process.env.CORS_ALLOWED_ORIGINS || "*")
//                 .split(",")
//                 .filter(Boolean),
//             allowCredentials: true,
//         },
//         // CSRF có thể bật trong dev nếu muốn test
//     },

//     port: process.env.PORT || 1337,
//     log: { level: "debug" },

//     custom: {
//         baseUrl: process.env.BASE_URL || "http://localhost:1338",
//         internalEmailAddress:
//             process.env.INTERNAL_EMAIL || "support@yourdomain.com",
//         jwtSecret: process.env.JWT_SECRET || "dev_jwt_secret",
//     },
// };
