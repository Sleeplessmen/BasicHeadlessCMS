module.exports = function error(err) {
    let status = 500;
    let name = "ApplicationError";
    let message = "Lỗi không xác định";
    let details = {};

    if (err && typeof err === "object") {
        status = err.status || status;
        name = err.name || name;
        message = err.message || message;
        details = err.details || details;
    }

    return this.res.status(status).json({
        errors: [
            {
                name,
                message,
                details,
            },
        ],
    });
};
