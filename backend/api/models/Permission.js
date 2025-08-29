module.exports = {
    attributes: {
        action: {
            type: "string",
            required: true,
            isIn: [
                "create",
                "read",
                "update",
                "delete",
                "assign-permission",
                "assign-role",
                "publish",
            ],
        },

        resource: {
            type: "string",
            required: true,
            isIn: [
                "permission",
                "role",
                "user",
                "content-type",
                "content-entry",
                "file",
            ],
        },

        description: { type: "string" },

        // // Optional: scope (admin, public, custom) -> giống Strapi
        // scope: {
        //     type: "string",
        //     isIn: ["admin", "application"],
        //     defaultsTo: "application",
        // },

        // Relation with Role
        roles: {
            collection: "role",
            via: "permissions",
            dominant: true,
        },
    },
};
