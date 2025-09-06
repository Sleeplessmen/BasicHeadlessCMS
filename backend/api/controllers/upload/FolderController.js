module.exports = {
    async find(req, res) {
        try {
            const folders = await Folder.find().populate("parent");
            return res.json(folders);
        } catch (err) {
            return res.serverError(err);
        }
    },

    async findOne(req, res) {
        try {
            const folder = await Folder.findOne({ id: req.params.id })
                .populate("assets")
                .populate("parent");

            if (!folder) return res.notFound();
            return res.json(folder);
        } catch (err) {
            return res.serverError(err);
        }
    },

    async create(req, res) {
        try {
            const { name, parent } = req.body;
            const newFolder = await Folder.create({ name, parent }).fetch();
            return res.json(newFolder);
        } catch (err) {
            return res.serverError(err);
        }
    },

    async update(req, res) {
        try {
            const { name, parent } = req.body;
            const updated = await Folder.updateOne({ id: req.params.id }).set({
                name,
                parent,
            });
            if (!updated) return res.notFound();
            return res.json(updated);
        } catch (err) {
            return res.serverError(err);
        }
    },

    async destroy(req, res) {
        try {
            const deleted = await Folder.destroyOne({ id: req.params.id });
            if (!deleted) return res.notFound();
            return res.json(deleted);
        } catch (err) {
            return res.serverError(err);
        }
    },
};
