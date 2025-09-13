module.exports = {
    attributes: {
        uid: { type: "string", required: true, unique: true }, // vd: api::article.article
        modelName: { type: "string", required: true }, // vd: article
        kind: {
            type: "string",
            isIn: ["collectionType", "singleType"],
            defaultsTo: "collectionType",
        },
        globalId: { type: "string" }, // vd: Article
        collectionName: { type: "string" }, // vd: articles

        plugin: { type: "string", allowNull: true }, // vd: upload
        modelType: {
            type: "string",
            isIn: ["contentType", "component"],
            defaultsTo: "contentType",
        },

        options: { type: "json", defaultsTo: {} }, // { draftAndPublish: true/false }
        pluginOptions: { type: "json", defaultsTo: {} }, // { i18n: { localized: true } }

        info: { type: "json", defaultsTo: {} }, // { singularName, pluralName, displayName, description }

        visible: { type: "boolean", defaultsTo: true },
        restrictRelationsTo: { type: "json", defaultsTo: null }, // vd: ["api::article.article", "api::category.category"]

        // Quan hệ: 1 contentType có nhiều field
        attributes: {
            collection: "ContentTypeField",
            via: "contentType",
        },

        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },
};
