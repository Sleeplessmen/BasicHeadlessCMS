// api/models/Role.js

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

        // Mối quan hệ ngược với User
        users: {
            collection: "user",
            via: "roles",
        },

        // Mối quan hệ với Permission
        permissions: {
            collection: "permission",
            via: "roles",
            dominant: true,
        },
    },
};
