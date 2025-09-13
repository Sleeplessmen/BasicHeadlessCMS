module.exports = {
    models: {
        schema: true,
        migrate: "alter",
        attributes: {
            id: { type: "string", columnName: "_id" },
        },
        cascadeOnDestroy: true,
    },

    blueprints: {
        shortcuts: true,
        actions: true,
        rest: true,
    },

    security: {
        cors: {
            allowOrigins: (process.env.CORS_ALLOWED_ORIGINS || "*")
                .split(",")
                .filter(Boolean),
            allowCredentials: true,
        },
    },

    port: process.env.PORT || 1338,
    log: { level: "debug" },
};
