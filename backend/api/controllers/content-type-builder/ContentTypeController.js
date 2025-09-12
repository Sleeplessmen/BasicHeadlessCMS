const { NotFoundError } = require("../../../errors");

// fixing
module.exports = {
    // GET api/v1/admin/content-types
    async getContentTypes(req, res) {
        const contentTypes = await ContentType.find().populate("attributes");

        if (!contentTypes || contentTypes.length === 0) {
            throw new NotFoundError("Không tìm thấy content types");
        }

        const result = contentTypes.map((ct) => ({
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
        }));

        return res.ok(
            await sails.helpers.response.success.with({
                data: result,
                message: "Lấy danh sách content types thành công",
            }),
        );
    },

    // GET api/v1/admin/content-types/:uid
    async getContentType(req, res) {
        const { uid } = req.params;

        const contentType = await ContentType.findOne({ uid }).populate(
            "attributes",
        );
        if (!contentType)
            throw new NotFoundError("Không tìm thấy content type");

        const result = {
            uid: contentType.uid,
            plugin: contentType.plugin || null,
            modelName: contentType.modelName,
            kind: contentType.kind,
            collectionName: contentType.collectionName,
            globalId: contentType.globalId,
            modelType: contentType.modelType || "contentType",
            info: contentType.info || {},
            options: contentType.options || {},
            pluginOptions: contentType.pluginOptions || {},
            visible: contentType.visible,
            restrictRelationsTo: contentType.restrictRelationsTo,
            attributes: buildAttributes(contentType.attributes),
        };

        return res.ok(
            await sails.helpers.response.success.with({
                data: result,
                message: "Lấy chi tiết content type thành công",
            }),
        );
    },
};

// Helper: Convert ContentField[] -> attributes object
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

        // relation
        if (f.type === "relation") {
            Object.assign(base, {
                relation: f.relation,
                target: f.target,
                inversedBy: f.inversedBy,
                mappedBy: f.mappedBy,
                targetAttribute: f.targetAttribute,
            });
        }

        // component
        if (f.type === "component") {
            base.component = f.component;
            base.repeatable = f.multiple || false;
        }

        // dynamic zone
        if (f.type === "dynamiczone") {
            base.components = f.components || [];
        }

        // media
        if (f.type === "media") {
            base.multiple = f.multiple;
            base.allowedTypes = f.allowedTypes || ["files", "images", "videos"];
        }

        // min/max cho text/number
        if (f.minLength) base.minLength = f.minLength;
        if (f.maxLength) base.maxLength = f.maxLength;

        attrs[f.name] = base;
    }
    return attrs;
}
