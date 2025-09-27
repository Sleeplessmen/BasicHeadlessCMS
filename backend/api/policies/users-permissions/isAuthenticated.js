const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../../../errors");

module.exports = async function (req, res, proceed) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Missing or invalid Authorization header.");
    }

    const token = authHeader.split(" ")[1];

    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
        throw new UnauthorizedError(
            "Token đã bị thu hồi, vui lòng đăng nhập lại",
        );
    }

    const decoded = jwt.verify(token, sails.config.custom.jwtSecret);

    const user = await User.findOne({ id: decoded.id });
    if (!user) {
        throw new UnauthorizedError("User not found.");
    }

    req.me = user;
    req.token = token;

    return proceed();
};
