module.exports = {
    attributes: {
        name: {
            type: "string",
            required: true,
            unique: true,
        },

        code: {
            type: "string",
            required: true,
            unique: true,
            // ví dụ: "strapi-super-admin", "strapi-editor"
        },

        description: {
            type: "string",
            defaultsTo: "",
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
