module.exports = {
    async getContentTypes(req, res) {
        return res.ok({ message: "ContentTypeController.getContentTypes" });
    },
    async getContentType(req, res) {
        return res.ok({ message: "ContentTypeController.getContentType" });
    },
};
