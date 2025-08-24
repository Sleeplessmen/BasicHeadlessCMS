module.exports = {
    attributes: {
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
        fullName: {
            type: "string",
            defaultsTo: "",
        },
        isActive: {
            type: "boolean",
            defaultsTo: true,
        },
        lastLoginAt: {
            type: "ref",
            columnType: "datetime",
        },

        roles: {
            collection: "role",
            via: "users",
        },
    },
};
