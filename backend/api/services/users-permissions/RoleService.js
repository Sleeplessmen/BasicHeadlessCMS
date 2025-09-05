module.exports = {
    async find(query = {}) {
        // TODO: lấy danh sách roles
        return { message: "RoleService.find", query };
    },

    async findOne(id) {
        // TODO: lấy role theo id
        return { message: "RoleService.findOne", id };
    },

    async create(data) {
        // TODO: tạo role mới
        return { message: "RoleService.create", data };
    },

    async update(id, data) {
        // TODO: update role
        return { message: "RoleService.update", id, data };
    },

    async destroy(id) {
        // TODO: xóa role
        return { message: "RoleService.destroy", id };
    },
};
