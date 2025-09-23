module.exports.models = {
    migrate: "alter",

    schema: true,

    attributes: {
        id: {
            type: "string",
            columnName: "_id",
        },

        // createdAt: { type: "ref", columnType: "datetime", autoCreatedAt: true },
        // updatedAt: { type: "ref", columnType: "datetime", autoUpdatedAt: true },
    },

    cascadeOnDestroy: true,

    archiveModelIdentity: false,
};
