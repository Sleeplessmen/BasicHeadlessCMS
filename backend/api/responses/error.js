module.exports = function error(err) {
    const res = this.res;

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

    return res.status(status).json({
        data: null,
        error: {
            status,
            name,
            message,
            details,
        },
    });
};
