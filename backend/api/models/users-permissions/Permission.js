module.exports = {
    attributes: {
        action: { type: "string", required: true }, // e.g. "read", "createRole"
        resource: { type: "string", required: true }, // e.g. "plugin::users-permissions.role"
        description: { type: "string" },

        roles: {
            collection: "role",
            via: "permissions",
            dominant: true,
        },
    },
};
