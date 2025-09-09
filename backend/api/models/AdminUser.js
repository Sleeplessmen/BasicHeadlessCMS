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

        isActive: {
            type: "boolean",
            defaultsTo: true,
        },

        blocked: {
            type: "boolean",
            defaultsTo: false,
        },

        password: {
            type: "string",
            required: true,
            protect: true,
        },

        roles: {
            collection: "AdminRole",
            via: "users",
        },
    },
};
