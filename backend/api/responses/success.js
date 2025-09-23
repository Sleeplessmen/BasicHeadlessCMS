module.exports = function success(inputs) {
    return this.res.status(200).json({
        message: inputs.message || "Thành công",
        data: inputs.data || {},
        meta: inputs.meta || {},
    });
};
