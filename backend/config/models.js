module.exports.models = {
    // Strict schema: false với MongoDB để chấp nhận field linh hoạt
    schema: true,

    // Migration strategy
    migrate: process.env.NODE_ENV === "development" ? "alter" : "safe",

    // Default attributes cho tất cả models
    attributes: {
        id: { type: "string", columnName: "_id" },
        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },

    // Data encryption keys (nên lấy từ ENV)
    dataEncryptionKeys: {
        default:
            process.env.DATA_ENCRYPTION_KEY ||
            "E6WWj4Ki7JmEsmcmezSxJMskPF6tg00XF3W4DSRnNlQ=",
    },

    // Cascade delete cho quan hệ
    cascadeOnDestroy: true,
};
