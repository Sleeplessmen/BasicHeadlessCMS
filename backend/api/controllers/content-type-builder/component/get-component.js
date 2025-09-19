const { NotFoundError } = require("../../../../errors");

module.exports = {
    friendlyName: "Get Component",
    description: "Lấy thông tin một component theo UID",

    inputs: {
        uid: { type: "string", required: true },
    },

    fn: async function (inputs) {
        const comp = await Component.findOne({ uid: inputs.uid }).populate(
            "attributes",
        );
        if (!comp)
            throw new NotFoundError(`Không tìm thấy component: ${inputs.uid}`);

        const formatted = {
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

        return this.res.success(
            formatted,
            `Lấy thông tin component: ${inputs.uid} thành công`,
        );
    },
};
