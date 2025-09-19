const { NotFoundError } = require("../../../errors");

function buildAttributes(attrs = []) {
    return attrs.map((f) => ({
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
    }));
}

module.exports = {
    friendlyName: "Get Schemas",
    description: "Lấy danh sách content types và components",

    exits: {
        notFound: {
            description: "Không tìm thấy content types hoặc components",
            responseType: "notFound",
        },
    },

    fn: async function (inputs, exits) {
        const contentTypes = await ContentType.find().populate("attributes");
        const components = await Component.find().populate("attributes");

        if (
            (!contentTypes || contentTypes.length === 0) &&
            (!components || components.length === 0)
        ) {
            throw new NotFoundError(
                "Không tìm thấy content types hoặc components",
            );
        }

        const contentTypesObj = {};
        for (const ct of contentTypes) {
            contentTypesObj[ct.uid] = {
                uid: ct.uid,
                plugin: ct.plugin || null,
                modelName: ct.modelName,
                kind: ct.kind,
                collectionName: ct.collectionName,
                globalId: ct.globalId,
                modelType: ct.modelType || "contentType",
                info: ct.info || {},
                options: ct.options || {},
                pluginOptions: ct.pluginOptions || {},
                visible: ct.visible,
                restrictRelationsTo: ct.restrictRelationsTo,
                attributes: buildAttributes(ct.attributes),
            };
        }

        const componentsObj = {};
        for (const comp of components) {
            componentsObj[comp.uid] = {
                uid: comp.uid,
                modelName: comp.modelName,
                globalId: comp.globalId,
                collectionName: comp.collectionName,
                category: comp.category,
                modelType: comp.modelType,
                info: comp.info,
                options: comp.options || {},
                pluginOptions: comp.pluginOptions || {},
                attributes: buildAttributes(comp.attributes),
            };
        }

        return exits.success({
            data: { contentTypes: contentTypesObj, components: componentsObj },
            message:
                "Lấy danh sách schemas (content types + components) thành công",
        });
    },
};
