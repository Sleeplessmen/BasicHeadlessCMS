module.exports = {
    attributes: {
        action: {
            type: "string",
            required: true,
            // ví dụ: create, read, update, delete
        },

        resource: {
            type: "string",
            required: true,
            // ví dụ: "user", "content-entry", "asset"
        },

        description: { type: "string" },

        roles: {
            collection: "Role",
            via: "permissions",
            dominant: true,
        },
    },
};
