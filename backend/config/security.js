module.exports.security = {
    cors: {
        allRoutes: true,
        allowOrigins: process.env.CORS_ALLOWED_ORIGINS
            ? process.env.CORS_ALLOWED_ORIGINS.split(",").map((origin) =>
                  origin.trim(),
              )
            : ["http://localhost:5173"],
        allowCredentials: true,
        allowRequestHeaders: ["Content-Type", "Authorization"],
    },
    csrf: false, // dev có thể tắt
};
