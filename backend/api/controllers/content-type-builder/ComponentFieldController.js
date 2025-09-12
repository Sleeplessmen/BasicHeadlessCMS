const { NotFoundError } = require("../../../errors");

// fixing
module.exports = {
    // GET /api/v1/admin/component-fields/:componentUid
    async getFields(req, res) {
        const { componentUid } = req.params;

        const comp = await Component.findOne({ uid: componentUid }).populate(
            "attributes",
        );
        if (!comp)
            throw new NotFoundError(
                `Không tìm thấy Component: ${componentUid}`,
            );

        const result = comp.attributes.map((f) => ({
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
                message: `Lấy danh sách fields của Component ${componentUid} thành công`,
            }),
        );
    },

    // POST /api/v1/admin/component-fields/:componentUid
    async createField(req, res) {
        const { componentUid } = req.params;
        const data = req.body;

        const comp = await Component.findOne({ uid: componentUid });
        if (!comp)
            throw new NotFoundError(
                `Không tìm thấy Component: ${componentUid}`,
            );

        const field = await ComponentField.create({
            ...data,
            component: comp.id,
        }).fetch();

        return res.ok(
            await sails.helpers.response.success.with({
                data: field,
                message: `Tạo field mới cho Component ${componentUid} thành công`,
            }),
        );
    },

    // PUT /api/v1/admin/component-fields/:id
    async updateField(req, res) {
        const { id } = req.params;
        const data = req.body;

        const field = await ComponentField.updateOne({ id }).set(data);
        if (!field) throw new NotFoundError(`Không tìm thấy field id=${id}`);

        return res.ok(
            await sails.helpers.response.success.with({
                data: field,
                message: "Cập nhật field thành công",
            }),
        );
    },

    // DELETE /api/v1/admin/component-fields/:id
    async deleteField(req, res) {
        const { id } = req.params;

        const field = await ComponentField.destroyOne({ id });
        if (!field) throw new NotFoundError(`Không tìm thấy field id=${id}`);

        return res.ok(
            await sails.helpers.response.success.with({
                data: field,
                message: "Xoá field thành công",
            }),
        );
    },
};
