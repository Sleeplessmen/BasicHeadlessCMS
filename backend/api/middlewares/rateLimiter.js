const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // maximum 100 requests/windowMs/IP
    message: {
        error: {
            status: 429,
            name: "TooManyRequests",
            message: "Bạn đã gửi quá nhiều request. Vui lòng thử lại sau.",
            details: {},
        },
    },
    standardHeaders: true, // send info in header RateLimit-*
    legacyHeaders: false,
});

module.exports = apiLimiter;
