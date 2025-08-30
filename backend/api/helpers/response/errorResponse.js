const BaseError = require("../../../errors");

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
    },
};
