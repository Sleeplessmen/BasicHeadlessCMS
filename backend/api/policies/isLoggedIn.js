const verifyToken = require("../../utils/verifyToken");
const { unauthorized, serverError } = require("../../utils/responseHelper");

module.exports = async function (req, res, proceed) {
    try {
        // B1. Giải mã token
        const decoded = await verifyToken(req);

        // B2. Tìm user và role
        const user = await User.findOne({ id: decoded.id }).populate("role");
        if (!user || !user.role) {
            return res
                .status(401)
                .json(
                    unauthorized(
                        "Không xác thực được người dùng (User không tồn tại hoặc thiếu role)"
                    )
                );
        }

        // B3. Populate thêm permissions của role
        const roleWithPermissions = await Role.findOne({
            id: user.role.id,
        }).populate("permissions");
        user.role = roleWithPermissions;

        // B4. Gán user vào req để các controller sử dụng
        req.user = user;

        return proceed();
    } catch (err) {
        const statusCode = err.statusCode || err.status || 500;
        if (statusCode === 401 || statusCode === 403) {
            return res.status(statusCode).json(unauthorized(err.message));
        }
        return res.status(500).json(serverError(err));
    }
};
