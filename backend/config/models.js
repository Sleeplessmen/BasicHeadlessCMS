module.exports.models = {
    migrate: "alter", // sẽ bị override thành 'safe' trong production.js
    schema: true,
    attributes: {
        id: { type: "string", columnName: "_id" },
    },
    cascadeOnDestroy: true,
};
