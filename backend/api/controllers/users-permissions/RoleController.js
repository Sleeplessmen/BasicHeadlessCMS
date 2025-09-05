module.exports = {
    async find(req, res) {
        return res.ok({ message: "RoleController.find" });
    },

    async findOne(req, res) {
        return res.ok({ message: "RoleController.findOne" });
    },

    async create(req, res) {
        return res.ok({ message: "RoleController.create" });
    },

    async update(req, res) {
        return res.ok({ message: "RoleController.update" });
    },

    async destroy(req, res) {
        return res.ok({ message: "RoleController.destroy" });
    },
};
