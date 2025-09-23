module.exports = async function (req, res) {
    try {
        // ✅ TODO: Viết logic xử lý chính ở đây
        // const params = req.allParams();
        // const { id } = req.params;
        // const body = req.body;

        return res.ok({
            success: true,
            message: "Action chạy thành công (placeholder)",
        });
    } catch (err) {
        sails.log.error(`Lỗi ở action ${__filename}:`, err);
        return res.serverError({
            success: false,
            message: "Đã xảy ra lỗi không mong đợi",
            error: err.message,
        });
    }
};
