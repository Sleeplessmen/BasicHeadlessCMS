module.exports = {
    // upload/files
    async find(req, res) {
        return res.ok({ message: "AssetController.find" });
    },
    // upload/:id
    async findOne(req, res) {
        return res.ok({ message: "AssetController.findOne" });
    },
    // upload/
    async create(req, res) {
        return res.ok({ message: "AssetController.create" });
    },
    // upload/:id
    async update(req, res) {
        return res.ok({ message: "AssetController.update" });
    },
    // upload/:id
    async destroy(req, res) {
        return res.ok({ message: "AssetController.destroy" });
    },
    // upload/configuration
    async getConfiguration(req, res) {
        return res.ok({ message: "AssetController.getConfiguration" });
    },
    // upload/configuration
    async updateConfiguration(req, res) {
        return res.ok({ message: "AssetController.updateConfiguration" });
    },
};
