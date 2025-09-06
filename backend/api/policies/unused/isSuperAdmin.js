const { UnauthorizedError, ForbiddenError } = require("../../../errors");

module.exports = async function (req, res, proceed) {
    if (!req.user || !req.user.roles) {
        throw new UnauthorizedError("Bạn chưa đăng nhập");
    }

    const isSuperAdmin = req.user.roles.some(
        (role) => role.code === "strapi-super-admin",
    );

    if (!isSuperAdmin) {
        throw new ForbiddenError("Chỉ super-admin mới được phép truy cập");
    }

    return proceed();
};
