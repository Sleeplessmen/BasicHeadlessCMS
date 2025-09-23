module.exports = {
    attributes: {
        action: { type: "string", required: true },
        actionParameters: { type: "json", defaultsTo: {} },
        subject: { type: "string", allowNull: true },
        properties: { type: "json", defaultsTo: {} },
        conditions: { type: "json", defaultsTo: [] },
        description: { type: "string" },

        roles: {
            collection: "AdminRole",
            via: "permissions",
        },
    },
};
