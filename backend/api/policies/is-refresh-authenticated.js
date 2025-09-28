const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../../errors");

module.exports = async function (req, res, proceed) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError(
            "Thiếu refresh token hoặc định dạng không hợp lệ",
        );
    }

    const token = authHeader.split(" ")[1];

    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
        throw new UnauthorizedError(
            "Refresh token đã bị thu hồi, vui lòng đăng nhập lại",
        );
    }

    let decoded;
    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
        );

        if (decoded.type !== "refresh") {
            throw new UnauthorizedError("Token không phải refresh token");
        }

        const refreshTokenRecord = await RefreshToken.findOne({ token });
        if (!refreshTokenRecord || refreshTokenRecord.expiresAt < Date.now()) {
            throw new UnauthorizedError(
                "Refresh token không hợp lệ hoặc đã hết hạn",
            );
        }
    } catch (err) {
        if (
            err.name === "TokenexpiresError" ||
            err.name === "JsonWebTokenError"
        ) {
            throw new UnauthorizedError(
                "Refresh token không hợp lệ hoặc đã hết hạn",
            );
        }
        throw err;
    }

    const user = await AdminUser.findOne({ id: decoded.id }).populate("roles");
    if (!user) {
        throw new UnauthorizedError("Người dùng không tồn tại hoặc đã bị xoá");
    }

    req.user = user;
    req.refreshToken = token;
    req.tokenType = "refresh";

    return proceed();
};
