module.exports = {
    friendlyName: "Get Components",
    description: "Lấy danh sách tất cả components",

    fn: async function () {
        const components = await Component.find().populate("attributes");

        const formatted = {};
        for (const comp of components) {
            formatted[comp.uid] = {
                uid: comp.uid,
                modelName: comp.modelName,
                globalId: comp.globalId,
                collectionName: comp.collectionName,
                category: comp.category,
                modelType: comp.modelType,
                info: comp.info,
                options: comp.options || {},
                pluginOptions: comp.pluginOptions || {},
                attributes: (comp.attributes || []).map((f) => ({
                    name: f.name,
                    type: f.type,
                    configurable: f.configurable,
                    required: f.required,
                    unique: f.unique,
                    private: f.private,
                    searchable: f.searchable,
                    minLength: f.minLength,
                    maxLength: f.maxLength,
                    relation: f.relation,
                    target: f.target,
                    inversedBy: f.inversedBy,
                    mappedBy: f.mappedBy,
                    targetAttribute: f.targetAttribute,
                    component: f.component,
                    components: f.components,
                    multiple: f.multiple,
                    allowedTypes: f.allowedTypes,
                    pluginOptions: f.pluginOptions || {},
                })),
            };
        }

        return this.res.success(
            formatted,
            "Lấy danh sách components thành công",
        );
    },
};
