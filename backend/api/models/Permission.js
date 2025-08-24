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
                "export",
            ],
        },
        resource: {
            type: "string",
            required: true,
            isIn: [
                "permission",
                "role",
                "user",
                "page",
                "content-type",
                "content-entry",
                "file",
            ],
        },
        description: { type: "string" },

        roles: {
            collection: "role",
            via: "permissions",
            dominant: true,
        },
    },
};
