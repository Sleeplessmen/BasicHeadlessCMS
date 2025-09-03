module.exports = {
    attributes: {
        // Ví dụ: "admin::user.create", "plugin::upload.read"
        action: {
            type: "string",
            required: true,
        },

        // Subject của permission, ví dụ: "admin::user", "plugin::content-type-builder"
        subject: {
            type: "string",
            allowNull: true,
        },

        // Metadata mô tả thêm
        properties: {
            type: "json",
            defaultsTo: {},
        },

        // Điều kiện (ví dụ: "is-creator", "has-role-x")
        conditions: {
            type: "json",
            defaultsTo: [],
        },

        // Tham số action (field-level)
        actionParameters: {
            type: "json",
            defaultsTo: {},
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
