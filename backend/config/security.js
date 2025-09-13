module.exports.security = {
    cors: {
        allowOrigins: (process.env.CORS_ALLOWED_ORIGINS || "*")
            .split(",")
            .filter(Boolean),
        allowCredentials: true,
    },
    csrf: false, // có thể bật nếu muốn test CSRF
};
