module.exports = {
    attributes: {
        // Cơ bản
        uid: { type: "string", required: true, unique: true }, // vd: shared.rich-text
        modelName: { type: "string", required: true }, // vd: rich-text
        globalId: { type: "string" }, // vd: RichText
        collectionName: { type: "string" }, // vd: components_shared_rich_texts
        category: { type: "string", defaultsTo: "default" }, // vd: shared, product
        modelType: {
            type: "string",
            isIn: ["component"],
            defaultsTo: "component",
        },

        // Tuỳ chọn nâng cao
        options: { type: "json", defaultsTo: {} },
        pluginOptions: { type: "json", defaultsTo: {} },
        info: { type: "json", defaultsTo: {} }, // { displayName, description }

        // Quan hệ: 1 component có nhiều field
        attributes: {
            collection: "ComponentField",
            via: "componentRef",
        },

        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },
};
