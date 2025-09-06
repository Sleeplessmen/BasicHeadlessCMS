module.exports.models = {
    schema: true,

    migrate: process.env.NODE_ENV === "development" ? "alter" : "safe",

    attributes: {
        id: { type: "string", columnName: "_id" },
        // createdAt: { type: "number", autoCreatedAt: true },
        // updatedAt: { type: "number", autoUpdatedAt: true },
    },

    dataEncryptionKeys: {
        default:
            process.env.DATA_ENCRYPTION_KEY ||
            "E6WWj4Ki7JmEsmcmezSxJMskPF6tg00XF3W4DSRnNlQ=",
    },

    cascadeOnDestroy: false,
};
