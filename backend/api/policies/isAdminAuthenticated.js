const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../../errors");

module.exports = async function (req, res, proceed) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Thiếu token hoặc định dạng không hợp lệ");
    }

    const token = authHeader.split(" ")[1];

    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
        throw new UnauthorizedError(
            "Token đã bị thu hồi, vui lòng đăng nhập lại",
        );
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    } catch (err) {
        if (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError"
        ) {
            throw new UnauthorizedError("Token không hợp lệ hoặc đã hết hạn");
        }
        throw err;
    }

    const user = await AdminUser.findOne({ id: decoded.id }).populate("roles");
    if (!user) {
        throw new UnauthorizedError("Người dùng không tồn tại hoặc đã bị xoá");
    }

    req.user = user; // đồng bộ luôn từ DB
    req.token = token;

    return proceed();
};
