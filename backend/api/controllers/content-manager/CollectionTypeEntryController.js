module.exports = {
    async find(req, res) {
        return res.ok({ message: "ContentEntryController.find" });
    },
    async findOne(req, res) {
        return res.ok({ message: "ContentEntryController.findOne" });
    },
    async create(req, res) {
        return res.ok({ message: "ContentEntryController.create" });
    },
    async update(req, res) {
        return res.ok({ message: "ContentEntryController.update" });
    },
    async delete(req, res) {
        return res.ok({ message: "ContentEntryController.delete" });
    },
};
