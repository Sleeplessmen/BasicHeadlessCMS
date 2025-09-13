module.exports = {
    async find(req, res) {
        const data = await ProductPage.find().limit(1);
        return res.ok({ data: data[0] || null });
    },
};
