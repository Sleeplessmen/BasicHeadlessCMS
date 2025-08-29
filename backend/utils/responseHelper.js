const BaseError = require("./errors");

function success(data, message = "Thành công", meta = {}) {
    return {
        data: data,
        meta,
        error: null,
        message,
    };
}

function errorResponse(err) {
    if (err instanceof BaseError) {
        return {
            data: null,
            error: {
                status: err.status,
                name: err.name,
                message: err.message,
                details: err.details,
            },
        };
    }

    return {
        data: null,
        error: {
            status: 500,
            name: "ApplicationError",
            message: (err && err.message) || "Lỗi không xác định",
            details: {},
        },
    };
}

module.exports = {
    success,
    errorResponse,
};
