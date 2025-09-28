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
        decoded = jwt.decode(token);
        if (!decoded || !decoded.type) {
            throw new UnauthorizedError("Token không hợp lệ");
        }

        const secret =
            decoded.type === "refresh"
                ? process.env.JWT_REFRESH_SECRET || "default_refresh_secret"
                : process.env.JWT_SECRET || "default_secret";

        decoded = jwt.verify(token, secret);

        if (decoded.type === "refresh") {
            const refreshToken = await RefreshToken.findOne({ token });
            if (!refreshToken || refreshToken.expiresAt < Date.now()) {
                throw new UnauthorizedError(
                    "Refresh token không hợp lệ hoặc đã hết hạn",
                );
            }
            req.refreshToken = token;
        } else {
            req.accessToken = token;
        }
    } catch (err) {
        if (
            err.name === "TokenexpiresError" ||
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

    req.user = user;
    req.tokenType = decoded.type || "access";

    return proceed();
};
