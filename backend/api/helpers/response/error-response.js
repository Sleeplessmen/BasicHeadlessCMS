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
} = require("../../../errors");

module.exports = {
    friendlyName: "Error response",
    description: "Format an error response.",

    inputs: {
        err: {
            type: "ref",
            required: true,
        },
    },

    exits: {
        success: {
            description: "Trả về response lỗi",
        },
    },

    fn: async function (inputs) {
        const err = inputs.err;

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
            return {
                data: null,
                error: {
                    status: err.status,
                    name: err.name,
                    message: err.message,
                    details: err.details || {},
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
    },
};
