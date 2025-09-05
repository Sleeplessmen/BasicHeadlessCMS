/**
 * isAuthenticated
 *
 * Policy to check if the request is from a logged-in user.
 */
module.exports = async function (req, res, proceed) {
    try {
        // Trường hợp bạn dùng JWT:
        // - Parse token từ headers Authorization
        // - Verify token
        // - Attach user info vào req.me

        if (!req.me) {
            return res.unauthorized(
                "You must be logged in to access this resource.",
            );
        }

        return proceed();
    } catch (err) {
        sails.log.error("isAuthenticated policy error:", err);
        return res.serverError();
    }
};
