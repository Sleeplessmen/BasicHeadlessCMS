module.exports = {
    attributes: {
        firstname: {
            type: "string",
            required: true,
        },

        lastname: {
            type: "string",
            required: true,
        },

        username: {
            type: "string",
            allowNull: true,
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

        isActive: {
            type: "boolean",
            defaultsTo: true,
        },

        blocked: {
            type: "boolean",
            defaultsTo: false,
        },

        resetPasswordToken: {
            type: "string",
            allowNull: true,
        },

        registrationToken: {
            type: "string",
            allowNull: true,
        },

        lastLogin: {
            type: "ref",
            columnType: "datetime",
        },

        roles: {
            collection: "AdminRole",
            via: "users",
        },
    },
};
