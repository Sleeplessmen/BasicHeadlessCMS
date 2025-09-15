module.exports = function success(
    data = {},
    message = "Thành công",
    meta = {},
) {
    const res = this.res;
    return res.status(200).json({
        message,
        data,
        meta,
    });
};
