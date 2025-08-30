const jwt = require("jsonwebtoken");

module.exports = {
    /**
     * Tạo JWT token từ payload
     * @param {Object} payload - Dữ liệu cần encode (ví dụ: { id, role })
     * @param {String} [expiresIn="1d"] - Thời gian hết hạn
     * @returns {String} token
     */
    signToken(payload, expiresIn = "1d") {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    },

    /**
     * Xác thực token từ request
     * @param {Request} req - Request object của Sails
     * @returns {Object} decoded payload
     * @throws {Object} error { status, message }
     */
    verifyToken(req) {
        let token = null;

        // Ưu tiên cookie
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        // Nếu không có, lấy từ header Authorization
        else if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            sails.log.warn("[JwtService] Không tìm thấy token trong request");
            throw {
                status: 401,
                message: "Token không tồn tại hoặc không hợp lệ",
            };
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded || !decoded.id) {
                throw { status: 403, message: "Token không hợp lệ" };
            }
            return decoded;
        } catch (err) {
            sails.log.error("[JwtService] JWT error:", err);
            throw {
                status: 403,
                message: "Token không hợp lệ hoặc đã hết hạn",
            };
        }
    },
};
