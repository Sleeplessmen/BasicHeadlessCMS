module.exports = {
    attributes: {
        action: {
            type: "string",
            required: true,
            // isIn: [
            //     "create",
            //     "read",
            //     "update",
            //     "delete",
            //     "assign-permission",
            //     "assign-role",
            //     "publish",
            // ],
        },

        resource: {
            type: "string",
            required: true,
            // isIn: [
            //     "permission",
            //     "role",
            //     "user",
            //     "content-type",
            //     "content-entry",
            //     "asset",
            // ],
        },

        description: { type: "string" },

        roles: {
            collection: "role",
            via: "permissions",
            dominant: true,
        },
    },
};
