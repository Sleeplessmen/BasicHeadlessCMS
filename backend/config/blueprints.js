module.exports.blueprints = {
    rest: true,
    shortcuts: false,
    actions: false,
    additionalActions: {
        publish: { method: "PUT" },
        unpublish: { method: "PUT" },
    },
};
