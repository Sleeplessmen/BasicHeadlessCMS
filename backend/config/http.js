const logRequest = require("../api/middlewares/logRequest");
const rateLimiter = require("../api/middlewares/rateLimiter");
const errorHandler = require("../api/middlewares/errorHandler");
const stateInitializer = require("../api/middlewares/stateInitializer"); // tạo state object
const attachUser = require("../api/middlewares/attachUser"); // decode JWT, load user
const attachRouteInfo = require("../api/middlewares/attachRouteInfo"); // phân tích route

module.exports.http = {
    middleware: {
        // Custom middleware
        logRequest,
        rateLimiter,
        stateInitializer,
        attachUser,
        attachRouteInfo,
        errorHandler,

        // Order of execution
        order: [
            "cookieParser",
            "session",
            "logRequest", // log trước
            "rateLimiter", // hạn chế request
            "bodyParser",
            "compress",
            "stateInitializer", // khởi tạo req.state = {}
            "attachUser", // decode token, gắn user, user.role
            "attachRouteInfo", // phân tích route, gắn route info
            "router", // router Sails
            "errorHandler", // gom lỗi cuối cùng
        ],
    },
};
