const { NotFoundError } = require("../../../errors");

module.exports = {
    async getContentTypes(req, res) {
        return res.ok({ message: "ContentTypeController.getContentTypes" });
    },

    async getContentType(req, res) {
        return res.ok({ message: "ContentTypeController.getContentType" });
    },

    async create(req, res) {
        return res.ok({ message: "ContentTypeController.create" });
    },

    async update(req, res) {
        return res.ok({ message: "ContentTypeController.update" });
    },

    async destroy(req, res) {
        return res.ok({ message: "ContentTypeController.destroy" });
    },
};

function buildAttributes(fields = []) {
    const attrs = {};
    for (const f of fields) {
        const base = {
            type: f.type,
            configurable: f.configurable,
            required: f.required,
            unique: f.unique,
            private: f.private,
            searchable: f.searchable,
            pluginOptions: f.pluginOptions || {},
        };

        if (f.type === "relation") {
            Object.assign(base, {
                relation: f.relation,
                target: f.target,
                inversedBy: f.inversedBy,
                mappedBy: f.mappedBy,
                targetAttribute: f.targetAttribute,
            });
        }
        if (f.type === "component") {
            base.component = f.component;
            base.repeatable = f.multiple || false;
        }
        if (f.type === "dynamiczone") {
            base.components = f.components || [];
        }
        if (f.type === "media") {
            base.multiple = f.multiple;
            base.allowedTypes = f.allowedTypes || ["files", "images", "videos"];
        }
        if (f.minLength) base.minLength = f.minLength;
        if (f.maxLength) base.maxLength = f.maxLength;

        attrs[f.name] = base;
    }
    return attrs;
}
