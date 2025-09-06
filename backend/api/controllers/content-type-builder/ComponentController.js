module.exports = {
    async getComponents(req, res) {
        return res.ok({ message: "ComponentController.getComponents" });
    },
    async getComponent(req, res) {
        return res.ok({ message: "ComponentController.getComponent" });
    },
};
