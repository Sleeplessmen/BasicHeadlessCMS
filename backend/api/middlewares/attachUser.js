const jwt = require("jsonwebtoken");

module.exports = async function attachUser(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return next();

        const token = authHeader.split(" ")[1];
        if (!token) return next();

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ id: payload.id });

        if (user) {
            req.state.user = user;
            req.state.role = user.role;
        }
        return next();
    } catch (err) {
        console.warn("⚠️ attachUser middleware failed:", err.message);
        return next();
    }
};
