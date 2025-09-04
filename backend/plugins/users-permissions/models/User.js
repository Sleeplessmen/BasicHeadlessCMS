module.exports = {
    attributes: {
        username: {
            type: "string",
            required: true,
            unique: true,
        },

        email: {
            type: "string",
            required: true,
            unique: true,
            isEmail: true,
        },

        password: {
            type: "string",
            required: true,
            protect: true,
        },

        confirmed: {
            type: "boolean",
            defaultsTo: false,
        }, // user có xác nhận email chưa

        blocked: {
            type: "boolean",
            defaultsTo: false,
        }, // user có bị khóa không

        lastLoginAt: {
            type: "ref",
            columnType: "datetime",
        },

        role: {
            model: "Role",
        }, // Role thuộc end-user
    },
};
