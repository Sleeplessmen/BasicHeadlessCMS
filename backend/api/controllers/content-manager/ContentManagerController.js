module.exports = {
    async init(req, res) {
        return res.ok({ message: "ContentManagerController.init" });
    },
    async findContentTypesSettings(req, res) {
        return res.ok({
            message: "ContentManagerController.findContentTypeSettings",
        });
    },
};
