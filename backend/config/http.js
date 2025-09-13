const logRequest = require("../api/middlewares/logRequest");
const rateLimiter = require("../api/middlewares/rateLimiter");
const errorHandler = require("../api/middlewares/errorHandler");

module.exports.http = {
    middleware: {
        // Custom middleware
        logRequest,
        rateLimiter,
        errorHandler,

        // Thứ tự chạy middleware
        order: [
            "cookieParser",
            "session",
            "logRequest", // log request trước
            "rateLimiter", // hạn chế request
            "bodyParser",
            "compress",
            "router", // router của Sails
            "errorHandler", // gom lỗi cuối cùng
        ],
    },

    trustProxy: false, // sẽ bị override = true trong production.js
    cache: 0, // sẽ bị override = 1 năm trong production.js
};
