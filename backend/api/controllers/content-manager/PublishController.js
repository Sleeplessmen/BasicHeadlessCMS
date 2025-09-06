module.exports = {
    async publish(req, res) {
        try {
            const { id } = req.params;
            const model = req.options.model; // sails tự truyền vào khi gọi route

            if (!sails.models[model]) {
                return res.badRequest({ error: `Unknown model: ${model}` });
            }

            const record = await sails.models[model]
                .updateOne({ id })
                .set({ publishedAt: new Date() });

            if (!record) {
                return res.notFound({ error: `Record not found for id ${id}` });
            }

            return res.json({ message: `${model} published`, data: record });
        } catch (err) {
            return res.serverError(err);
        }
    },

    async unpublish(req, res) {
        try {
            const { id } = req.params;
            const model = req.options.model;

            if (!sails.models[model]) {
                return res.badRequest({ error: `Unknown model: ${model}` });
            }

            const record = await sails.models[model]
                .updateOne({ id })
                .set({ publishedAt: null });

            if (!record) {
                return res.notFound({ error: `Record not found for id ${id}` });
            }

            return res.json({ message: `${model} unpublished`, data: record });
        } catch (err) {
            return res.serverError(err);
        }
    },
};
