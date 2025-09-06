module.exports = {
    async find(req, res) {
        return res.ok({ message: "AssetController.find" });
    },
    async findOne(req, res) {
        return res.ok({ message: "AssetController.findOne" });
    },
    async destroy(req, res) {
        return res.ok({ message: "AssetController.destroy" });
    },
    async upload(req, res) {
        return res.ok({ message: "AssetController.upload" });
    },
};
