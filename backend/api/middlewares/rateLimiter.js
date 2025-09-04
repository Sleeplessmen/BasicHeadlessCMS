const rateLimit = require("express-rate-limit");
const { TooManyRequestsError } = require("../../errors");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100, // tối đa 100 request / windowMs / IP

    handler: function () {
        // Thay vì res.json ở đây, ta throw để ErrorHandler xử lý
        throw new TooManyRequestsError(
            "Bạn đã gửi quá nhiều request. Vui lòng thử lại sau.",
        );
    },

    standardHeaders: true, // gửi info trong header RateLimit-*
    legacyHeaders: false,
});

module.exports = apiLimiter;
