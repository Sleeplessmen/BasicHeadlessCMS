module.exports = {
    async find(req, res) {
        return res.ok({ message: "UserController.find" });
    },

    async count(req, res) {
        return res.ok({ message: "UserController.count" });
    },

    async findOne(req, res) {
        return res.ok({ message: "UserController.findOne" });
    },

    async create(req, res) {
        return res.ok({ message: "UserController.create" });
    },

    async update(req, res) {
        return res.ok({ message: "UserController.update" });
    },

    async destroy(req, res) {
        return res.ok({ message: "UserController.destroy" });
    },
};
