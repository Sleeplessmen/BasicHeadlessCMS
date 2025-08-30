module.exports = {
    async getAll() {
        return await User.find();
    },
};
