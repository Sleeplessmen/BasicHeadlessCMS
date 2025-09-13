const { NotFoundError } = require("../../../errors");

// fixing

// Helper tái sử dụng cho attributes
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
    // GET api/v1/admin/content-type-builder/schema
    async getSchemas(req, res) {
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

        // Chuẩn hóa contentTypes thành object { uid: contentType }
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

        // Chuẩn hóa components thành object { uid: component }
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

        return res.ok(
            await sails.helpers.response.success.with({
                data: {
                    contentTypes: contentTypesObj,
                    components: componentsObj,
                },
                message:
                    "Lấy danh sách schemas (content types + components) thành công",
            }),
        );
    },

    // GET api/v1/admin/content-type-builder/reversed-names?name=...
    async getReversedNames(req, res) {
        const { name } = req.query; // Lấy tên từ query parameters
        if (!name) {
            return res.badRequest(
                await sails.helpers.response.error.with({
                    message: "Thiếu tham số 'name' trong query",
                }),
            );
        }

        // Tìm kiếm các tên ngược lại dựa trên tên đã cho
        const reversedNames = await sails.helpers.schema.getReversedNames(name);

        return res.ok(
            await sails.helpers.response.success.with({
                data: {
                    reversedNames,
                },
                message: "Lấy danh sách tên ngược lại thành công",
            }),
        );
    },
};
