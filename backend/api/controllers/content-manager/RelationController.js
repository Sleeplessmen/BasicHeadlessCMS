module.exports = {
    async findExistingRelations(req, res) {
        return res.ok({ message: "RelationController.listExistingRelations" });
    },
    async findAvailableRelations(req, res) {
        return res.ok({ message: "RelationController.listAvailableRelations" });
    },
};
