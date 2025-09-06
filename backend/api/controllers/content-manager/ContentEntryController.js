module.exports = {
    // Single type entry
    async find(req, res) {
        return res.ok({ message: "ContentEntryController.find" });
    },
    async update(req, res) {
        return res.ok({ message: "ContentEntryController.update" });
    },
    async delete(req, res) {
        return res.ok({ message: "ContentEntryController.delete" });
    },

    // Collection type entry
    async create(req, res) {
        return res.ok({ message: "ContentEntryController.create" });
    },
    async findOne(req, res) {
        return res.ok({ message: "ContentEntryController.findOne" });
    },
};
