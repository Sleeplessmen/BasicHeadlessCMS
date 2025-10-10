module.exports = {
    attributes: {
        modelName: { type: "string", required: true }, // vd: rich-text
        category: { type: "string", required: true }, // vd: shared

        uid: { type: "string", unique: true },
        globalId: { type: "string" },
        modelType: {
            type: "string",
            defaultsTo: "component",
        },
        collectionName: { type: "string" },

        info: { type: "json", defaultsTo: {} }, // vd: { displayName, description, icon }
        options: { type: "json", defaultsTo: { draftAndPublished: false } },

        attributes: {
            collection: "ComponentField",
            via: "componentRef",
        },

        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },

    beforeCreate: async function (values, proceed) {
        try {
            if (values.modelName && values.category) {
                values.uid =
                    values.uid || `${values.category}.${values.modelName}`;
                values.globalId =
                    values.globalId ||
                    (await sails.helpers.format.toPascalCase(values.modelName));

                const category = values.category.replace(/-/g, "_");
                const modelName = values.modelName.replace(/-/g, "_");
                values.collectionName =
                    values.collectionName ||
                    `components_${category}_${modelName}s`;
            }

            const defaultInfo = {
                displayName: values.displayName || values.modelName,
                icon: values.icon || "feather-box",
            };
            values.info = Object.assign({}, defaultInfo, values.info);

            return proceed();
        } catch (err) {
            return proceed(err);
        }
    },
};
