module.exports = {
    attributes: {
        uid: { type: "string", required: true, unique: true }, // vd: api::article.article
        modelName: { type: "string", required: true }, // vd: article
        globalId: { type: "string" }, // vd: Article

        kind: {
            type: "string",
            isIn: ["collectionType", "singleType"],
            defaultsTo: "collectionType",
        },

        // plugin: { type: "string", allowNull: true }, // vd: upload
        modelType: {
            type: "string",
            isIn: ["contentType", "component"],
            defaultsTo: "contentType",
        },
        visible: { type: "boolean", defaultsTo: true },
        restrictRelationsTo: { type: "json", defaultsTo: null }, // vd: ["api::article.article"]

        options: { type: "json", defaultsTo: {} },
        info: { type: "json", defaultsTo: {} }, // vd: { singularName, pluralName, displayName, description }

        attributes: {
            collection: "ContentTypeField",
            via: "contentType",
        },

        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },

    beforeCreate: function (values, cb) {
        const defaultInfo = {
            singularName: "",
            pluralName: "",
            displayName: "",
            description: "",
        };
        values.info = _.merge({}, defaultInfo, values.info);

        const defaultOptions = { draftAndPublish: false };
        values.options = _.merge({}, defaultOptions, values.options);

        return cb();
    },

    beforeUpdate: function (valuesToUpdate, cb) {
        if (valuesToUpdate.info) {
            const defaultInfo = {
                singularName: "",
                pluralName: "",
                displayName: "",
                description: "",
            };
            valuesToUpdate.info = _.merge({}, defaultInfo, valuesToUpdate.info);
        }
        return cb();
    },
};
