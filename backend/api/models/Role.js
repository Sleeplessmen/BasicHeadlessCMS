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

        type: {
            type: "string",
            isIn: ["super-admin", "editor", "author"],
            defaultsTo: "super-admin",
        },

        users: {
            collection: "user",
            via: "roles",
        },

        permissions: {
            collection: "permission",
            via: "roles",
            dominant: true,
        },
    },
};
