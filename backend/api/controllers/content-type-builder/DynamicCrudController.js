const path = require("path");

function getSchema(collection) {
    try {
        const schemaPath = path.join(
            __dirname,
            `../content-types/${collection}.js`,
        );
        return require(schemaPath);
    } catch (err) {
        return null;
    }
}

module.exports = {
    async find(req, res) {
        const { collection } = req.params;
        const schema = getSchema(collection);
        if (!schema) return res.notFound({ message: "ContentType not found" });

        if (schema.kind === "singleType") {
            const data = await sails.models[collection].find().limit(1);
            return res.ok({ data: data[0] || null });
        } else {
            const data = await sails.models[collection].find();
            return res.ok({ data });
        }
    },

    async findOne(req, res) {
        const { collection, id } = req.params;
        const schema = getSchema(collection);
        if (!schema) return res.notFound({ message: "ContentType not found" });

        if (schema.kind === "singleType") {
            return res.badRequest({
                message: "Single Type không hỗ trợ findOne theo id",
            });
        }
        const data = await sails.models[collection].findOne({ id });
        if (!data) return res.notFound();
        return res.ok({ data });
    },

    async create(req, res) {
        const { collection } = req.params;
        const schema = getSchema(collection);
        if (!schema) return res.notFound();

        if (schema.kind === "singleType") {
            return res.badRequest({
                message: "Single Type không hỗ trợ create",
            });
        }

        const created = await sails.models[collection].create(req.body).fetch();
        return res.ok({ data: created });
    },

    async update(req, res) {
        const { collection, id } = req.params;
        const schema = getSchema(collection);
        if (!schema) return res.notFound();

        if (schema.kind === "singleType") {
            const existing = await sails.models[collection].find().limit(1);
            if (existing.length) {
                const updated = await sails.models[collection]
                    .updateOne({ id: existing[0].id })
                    .set(req.body);
                return res.ok({ data: updated });
            } else {
                const created = await sails.models[collection]
                    .create(req.body)
                    .fetch();
                return res.ok({ data: created });
            }
        }

        const updated = await sails.models[collection]
            .updateOne({ id })
            .set(req.body);
        if (!updated) return res.notFound();
        return res.ok({ data: updated });
    },

    async destroy(req, res) {
        const { collection, id } = req.params;
        const schema = getSchema(collection);
        if (!schema) return res.notFound();

        if (schema.kind === "singleType") {
            const existing = await sails.models[collection].find().limit(1);
            if (!existing.length) return res.notFound();
            const deleted = await sails.models[collection].destroyOne({
                id: existing[0].id,
            });
            return res.ok({ data: deleted });
        }

        const deleted = await sails.models[collection].destroyOne({ id });
        if (!deleted) return res.notFound();
        return res.ok({ data: deleted });
    },
};
