module.exports = {
    async getContentTypes(req, res) {
        return res.ok({ message: "ContentTypeController.getContentTypes" });
    },
    async getContentType(req, res) {
        return res.ok({ message: "ContentTypeController.getContentType" });
    },
    async find(req, res) {
        const model = req.params.model;
        if (!sails.models[model]) return res.notFound();
        const records = await sails.models[model].find();
        return res.json(records);
    },

    async create(req, res) {
        const model = req.params.model;
        if (!sails.models[model]) return res.notFound();
        const record = await sails.models[model].create(req.body).fetch();
        return res.json(record);
    },
};
