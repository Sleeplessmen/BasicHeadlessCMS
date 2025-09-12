const { NotFoundError } = require("../../../errors");

// fixing
module.exports = {
    // GET /api/v1/admin/content-fields/:contentTypeUid
    async getFields(req, res) {
        const { contentTypeUid } = req.params;

        const ct = await ContentType.findOne({ uid: contentTypeUid }).populate(
            "attributes",
        );
        if (!ct)
            throw new NotFoundError(
                `Không tìm thấy ContentType: ${contentTypeUid}`,
            );

        const result = ct.attributes.map((f) => ({
            id: f.id,
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

        return res.ok(
            await sails.helpers.response.success.with({
                data: result,
                message: `Lấy danh sách fields của ContentType ${contentTypeUid} thành công`,
            }),
        );
    },

    // POST /api/v1/admin/content-fields/:contentTypeUid
    async createField(req, res) {
        const { contentTypeUid } = req.params;
        const data = req.body;

        const ct = await ContentType.findOne({ uid: contentTypeUid });
        if (!ct)
            throw new NotFoundError(
                `Không tìm thấy ContentType: ${contentTypeUid}`,
            );

        const field = await ContentField.create({
            ...data,
            contentType: ct.id,
        }).fetch();

        return res.ok(
            await sails.helpers.response.success.with({
                data: field,
                message: `Tạo field mới cho ContentType ${contentTypeUid} thành công`,
            }),
        );
    },

    // PUT /api/v1/admin/content-fields/:id
    async updateField(req, res) {
        const { id } = req.params;
        const data = req.body;

        const field = await ContentField.updateOne({ id }).set(data);
        if (!field) throw new NotFoundError(`Không tìm thấy field id=${id}`);

        return res.ok(
            await sails.helpers.response.success.with({
                data: field,
                message: "Cập nhật field thành công",
            }),
        );
    },

    // DELETE /api/v1/admin/content-fields/:id
    async deleteField(req, res) {
        const { id } = req.params;

        const field = await ContentField.destroyOne({ id });
        if (!field) throw new NotFoundError(`Không tìm thấy field id=${id}`);

        return res.ok(
            await sails.helpers.response.success.with({
                data: field,
                message: "Xoá field thành công",
            }),
        );
    },
};
