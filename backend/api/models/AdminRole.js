module.exports = {
    attributes: {
        name: {
            type: "string",
            required: true,
            unique: true,
        },

        description: {
            type: "string",
            defaultsTo: "",
        },

        // Chỉ dành cho admin panel
        type: {
            type: "string",
            isIn: ["super-admin", "editor", "author"],
            defaultsTo: "super-admin",
        },

        users: {
            collection: "AdminUser",
            via: "roles",
        },

        permissions: {
            collection: "AdminPermission",
            via: "roles",
            dominant: true,
        },
    },
};
