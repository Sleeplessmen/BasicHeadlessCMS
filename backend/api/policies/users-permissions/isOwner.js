module.exports = async function (req, res, proceed) {
    try {
        const userId = req.param("id"); // lấy id từ URL params

        if (!req.me) {
            return res.unauthorized("You must be logged in.");
        }

        if (!userId) {
            return res.badRequest("Missing user id.");
        }

        // Kiểm tra quyền sở hữu
        if (req.me.id.toString() !== userId.toString()) {
            return res.forbidden("You can only modify your own account.");
        }

        return proceed();
    } catch (err) {
        sails.log.error("isOwner policy error:", err);
        return res.serverError();
    }
};
