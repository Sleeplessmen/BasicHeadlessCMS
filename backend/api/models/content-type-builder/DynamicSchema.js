module.exports = {
    attributes: {
        uid: { type: "string", required: true, unique: true }, // e.g. "api::article.article" or "component::shared.user"
        kind: {
            type: "string",
            // isIn: ["collectionType", "singleType", "component"],
        },
        modelName: { type: "string", required: true },
        collectionName: { type: "string", required: true },
        category: { type: "string", allowNull: true },
        attributes: { type: "json", defaultsTo: [] }, // array of attribute defs (name, properties, etc.)
        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },
};
