const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100, // tối đa 100 request / windowMs / IP
    message: {
        error: {
            status: 429,
            name: "TooManyRequests",
            message: "Bạn đã gửi quá nhiều request. Vui lòng thử lại sau.",
            details: {},
        },
    },
    standardHeaders: true, // gửi info trong header RateLimit-*
    legacyHeaders: false,
});

module.exports = apiLimiter;
