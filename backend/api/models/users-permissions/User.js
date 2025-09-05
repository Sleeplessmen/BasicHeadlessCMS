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

        confirmed: { type: "boolean", defaultsTo: false },
        blocked: { type: "boolean", defaultsTo: false },
        lastLoginAt: { type: "ref", columnType: "datetime" },

        confirmationToken: { type: "string" },
        resetPasswordToken: { type: "string" },

        roles: {
            collection: "role",
            via: "users",
            dominant: true,
        },
    },
};
