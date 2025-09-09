const { update } = require("../controllers/AdminUserController");

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

        createdAt: {
            type: "number",
            autoCreatedAt: true,
        },

        updatedAt: {
            type: "number",
            autoUpdatedAt: true,
        },

        publishedAt: {
            type: "number",
            allowNull: true,
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
