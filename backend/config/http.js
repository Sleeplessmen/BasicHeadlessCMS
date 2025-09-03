const logRequest = require("../api/middlewares/logRequest");
const rateLimiter = require("../api/middlewares/rateLimiter");
const errorHandler = require("../api/middlewares/errorHandler");

module.exports.http = {
    middleware: {
        // Custom middleware
        logRequest,
        rateLimiter,
        errorHandler,

        // Order of execution
        order: [
            "cookieParser",
            "session",
            "logRequest", // log trước
            "rateLimiter", // hạn chế request
            "bodyParser",
            "compress",
            "router", // router Sails
            "errorHandler", // gom lỗi cuối cùng
        ],
    },
};
