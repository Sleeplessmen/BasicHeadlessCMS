module.exports = async function (req, res) {
    try {
        return res.ok({
            success: true,
            message: "Action chạy thành công (placeholder)",
        });
    } catch (err) {
        return res.serverError({
            success: false,
            message: "Đã xảy ra lỗi không mong đợi",
            error: err.message,
        });
    }
};
