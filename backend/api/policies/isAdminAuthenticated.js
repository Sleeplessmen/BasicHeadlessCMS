const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../../errors");

module.exports = async function (req, res, proceed) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedError(
                "Thiếu token hoặc định dạng không hợp lệ",
            );
        }

        const token = authHeader.split(" ")[1];

        // Kiểm tra token có bị blacklist không
        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            throw new UnauthorizedError(
                "Token đã bị thu hồi, vui lòng đăng nhập lại",
            );
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "default_secret",
        );

        req.user = decoded;
        req.token = token;

        return proceed();
    } catch (err) {
        sails.log.error("Policy authenticate - lỗi xác thực token:", err);

        // Nếu jwt.verify ném lỗi => wrap thành UnauthorizedError để đồng bộ
        if (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError"
        ) {
            throw new UnauthorizedError("Token không hợp lệ hoặc đã hết hạn");
        }

        throw err; // ném tiếp cho errorHandler xử lý
    }
};
