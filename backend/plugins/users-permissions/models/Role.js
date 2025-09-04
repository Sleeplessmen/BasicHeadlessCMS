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

        // Role mặc định của end-user
        type: {
            type: "string",
            isIn: ["public", "authenticated"],
            defaultsTo: "public",
        },

        users: {
            collection: "User", // end-user
            via: "role",
        },

        permissions: {
            collection: "Permission",
            via: "roles",
            dominant: true,
        },
    },
};
