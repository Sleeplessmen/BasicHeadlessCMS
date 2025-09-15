const {
    ApplicationError,
    ValidationError,
    ForbiddenError,
    UnauthorizedError,
    NotFoundError,
    BadRequestError,
    ConflictError,
    PayloadTooLargeError,
    PolicyError,
    TooManyRequestsError,
} = require("../../errors");

module.exports = async function errorHandler(err, req, res, unusedNext) {
    sails.log.error("Error Handler:", err);

    try {
        if (
            err instanceof ApplicationError ||
            err instanceof ValidationError ||
            err instanceof ForbiddenError ||
            err instanceof UnauthorizedError ||
            err instanceof NotFoundError ||
            err instanceof BadRequestError ||
            err instanceof ConflictError ||
            err instanceof PayloadTooLargeError ||
            err instanceof PolicyError ||
            err instanceof TooManyRequestsError
        ) {
            return res.error(err);
        }

        // Wrap nếu không phải error "chuẩn"
        const wrapped = new ApplicationError("Lỗi không xác định", {
            raw: err,
            url: req.url,
            method: req.method,
        });

        return res.error(wrapped);
    } catch (formatErr) {
        sails.log.error("Error Handler - lỗi khi format:", formatErr);
        return res.status(500).json({
            data: null,
            error: {
                name: "ApplicationError",
                message: "Lỗi hệ thống",
                details: { raw: err?.message || err },
            },
        });
    }
};
