module.exports = {
    attributes: {
        name: { type: "string", required: true, unique: true },
        code: { type: "string", required: true, unique: true },
        description: { type: "string", defaultsTo: "" },

        users: {
            collection: "AdminUser",
            via: "roles",
        },

        permissions: {
            collection: "AdminPermission",
            via: "roles",
        },
    },
};
