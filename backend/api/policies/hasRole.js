const {
    ForbiddenError,
    UnauthorizedError,
    ApplicationError,
} = require("../../errors");

module.exports = async function (req, res, proceed) {
    try {
        if (!req.user || !req.user.roles) {
            throw new UnauthorizedError(
                "Bạn chưa đăng nhập hoặc thiếu thông tin vai trò",
            );
        }

        // roles của user (gán khi decode JWT trong policy authenticate)
        const userRoles = req.user.roles.map((r) => r.name || r);

        // Lấy role yêu cầu từ route config
        // Ví dụ: policies: { "UserController.create": ["authenticate", "hasRole.super-admin"] }
        const requiredRole = req.options.requiredRole;

        if (!requiredRole) {
            sails.log.warn("Policy hasRole không được cấu hình role!");
            throw new ApplicationError("Thiếu cấu hình role trong policy", {
                source: "Policy hasRole",
            });
        }

        if (!userRoles.includes(requiredRole)) {
            throw new ForbiddenError(
                `Bạn cần quyền ${requiredRole} để truy cập`,
            );
        }

        return proceed();
    } catch (err) {
        sails.log.error("Policy hasRole - lỗi:", err);

        // Nếu là lỗi đã chuẩn hoá thì throw tiếp
        if (
            err instanceof UnauthorizedError ||
            err instanceof ForbiddenError ||
            err instanceof ApplicationError
        ) {
            throw err;
        }

        // Nếu lỗi lạ thì wrap lại thành ApplicationError
        throw new ApplicationError("Lỗi khi kiểm tra role", {
            source: "Policy hasRole",
            raw: err,
        });
    }
};
