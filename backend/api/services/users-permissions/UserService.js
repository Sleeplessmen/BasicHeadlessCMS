module.exports = {
    async find(query = {}) {
        // TODO: tìm user
        return { message: "UserService.find", query };
    },

    async count(query = {}) {
        // TODO: đếm số lượng user
        return { message: "UserService.count", query };
    },

    async findOne(id) {
        // TODO: tìm user theo id
        return { message: "UserService.findOne", id };
    },

    async create(data) {
        // TODO: tạo user mới
        return { message: "UserService.create", data };
    },

    async update(id, data) {
        // TODO: update user
        return { message: "UserService.update", id, data };
    },

    async destroy(id) {
        // TODO: xóa user
        return { message: "UserService.destroy", id };
    },
};
