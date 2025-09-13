module.exports = {
    attributes: {
        // 1. Thông tin nhận diện cơ bản
        uid: { type: "string", required: true, unique: true }, // vd: api::article.article
        modelName: { type: "string", required: true }, // vd: article
        globalId: { type: "string" }, // vd: Article
        collectionName: { type: "string" }, // vd: articles

        // 2. Loại & plugin liên quan
        kind: {
            type: "string",
            isIn: ["collectionType", "singleType"],
            defaultsTo: "collectionType",
        },
        plugin: { type: "string", allowNull: true }, // vd: upload
        modelType: {
            type: "string",
            isIn: ["contentType", "component"],
            defaultsTo: "contentType",
        },
        visible: { type: "boolean", defaultsTo: true },

        // 3. Tùy chọn nâng cao
        options: { type: "json", defaultsTo: {} }, // { draftAndPublish: true }
        pluginOptions: { type: "json", defaultsTo: {} }, // { i18n: { localized: true } }
        restrictRelationsTo: { type: "json", defaultsTo: null }, // vd: ["api::article.article"]

        // 4. Thông tin mô tả
        info: { type: "json", defaultsTo: {} }, // { singularName, pluralName, displayName, description }

        // 5. Quan hệ tới các field
        attributes: {
            collection: "ContentTypeField",
            via: "contentType",
        },

        // 6. Metadata
        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },
};
