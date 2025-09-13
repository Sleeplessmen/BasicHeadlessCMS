const { NotFoundError } = require("../../../errors");

module.exports = {
    // GET api/v1/admin/content-type-builder/components
    async getComponents(req, res) {
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

        return res.ok(
            await sails.helpers.response.success.with({
                data: formatted,
                message: "Lấy danh sách components thành công",
            }),
        );
    },

    // GET api/v1/admin/content-type-builder/components/:uid
    async getComponent(req, res) {
        const { uid } = req.params;
        const comp = await Component.findOne({ uid }).populate("attributes");

        if (!comp) throw new NotFoundError(`Không tìm thấy component: ${uid}`);

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

        return res.ok(
            await sails.helpers.response.success.with({
                data: formatted,
                message: `Lấy thông tin component: ${uid} thành công`,
            }),
        );
    },

    // POST api/v1/admin/content-type-builder/components
    async create(req, res) {
        return res.ok({ message: "ComponentController.create" });
    },

    // PUT api/v1/admin/content-type-builder/components/:uid
    async update(req, res) {
        return res.ok({ message: "ComponentController.update" });
    },

    // DELETE api/v1/admin/content-type-builder/components/:uid
    async destroy(req, res) {
        return res.ok({ message: "ComponentController.destroy" });
    },
};
