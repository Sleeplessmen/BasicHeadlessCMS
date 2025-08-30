module.exports = {
    attributes: {
        action: {
            type: "string",
            required: true,
            // ví dụ: create, read, update, delete, manage-users, manage-roles
        },

        resource: {
            type: "string",
            required: true,
            // ví dụ: "admin-user", "admin-role", "admin-permission", "content-type"
        },

        description: { type: "string" },

        roles: {
            collection: "AdminRole",
            via: "permissions",
            dominant: true,
        },
    },
};
