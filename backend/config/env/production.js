module.exports = {
    datastores: {
        default: {
            adapter: "sails-mongo",
            url: process.env.MONGO_URI,
        },
    },

    models: {
        migrate: "safe",
        schema: true,
    },

    blueprints: {
        shortcuts: false,
        actions: false,
        rest: false,
    },

    security: {
        cors: {
            allowOrigins: (process.env.CORS_ALLOWED_ORIGINS || "")
                .split(",")
                .filter(Boolean),
            allowCredentials: true,
        },
        csrf: true,
    },

    port: process.env.PORT || 1338,

    log: {
        level: "warn",
    },

    http: {
        trustProxy: true,
        cache: 365.25 * 24 * 60 * 60 * 1000,
    },

    custom: {
        baseUrl: process.env.BASE_URL || "https://yourdomain.com",
        internalEmailAddress:
            process.env.INTERNAL_EMAIL || "support@yourdomain.com",
        jwtSecret: process.env.JWT_SECRET,
        dataEncryptionKey: process.env.DATA_ENCRYPTION_KEY,
    },

    sockets: {
        onlyAllowOrigins: [
            "https://task1fe.vercel.app",
            "https://task1be.onrender.com",
        ],
    },
};
