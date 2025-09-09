const { allow } = require("joi");

module.exports = {
    attributes: {
        // Ví dụ: "admin::users.create", "plugin::upload.read", "plugin::content-manager.explorer.create"
        action: {
            type: "string",
            required: true,
        },

        actionParameters: {
            type: "json",
            defaultsTo: {},
        },

        // Subject của permission, ví dụ: "api::page.page", "api:blog-page.blog-page"
        subject: {
            type: "string",
            allowNull: true,
        },

        // Ví dụ các danh sách trường được phép thao tác
        properties: {
            type: "json",
            defaultsTo: {},
        },

        // Ví dụ: "is-creator", "has-role-x"
        conditions: {
            type: "json",
            defaultsTo: [],
        },

        description: {
            type: "string",
        },

        roles: {
            collection: "AdminRole",
            via: "permissions",
            dominant: true,
        },
    },
};
