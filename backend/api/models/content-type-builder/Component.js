const toPascalCase = (str) =>
    str
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("");

module.exports = {
    attributes: {
        modelName: { type: "string", required: true }, // vd: rich-text
        category: { type: "string", required: true }, // vd: shared

        uid: { type: "string", unique: true }, // Tự tạo: shared.rich-text
        globalId: { type: "string" }, // Tự tạo: RichText
        collectionName: { type: "string" }, // Tự tạo: components_shared_rich_texts

        info: { type: "json", defaultsTo: {} }, // { displayName, description, icon }
        options: { type: "json", defaultsTo: {} },

        attributes: {
            collection: "ComponentField",
            via: "componentRef",
        },

        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },

    beforeCreate: function (values, cb) {
        if (values.modelName && values.category) {
            values.uid = `${values.category}.${values.modelName}`;
            values.globalId = toPascalCase(values.modelName);
            const collectionCategory = values.category.replace(/-/g, "_");
            const collectionModelName = values.modelName.replace(/-/g, "_");
            values.collectionName = `components_${collectionCategory}_${collectionModelName}s`;
        }

        const defaultInfo = {
            displayName: values.modelName,
            description: "",
            icon: "",
        };
        values.info = Object.assign({}, defaultInfo, values.info);

        return cb();
    },
};
