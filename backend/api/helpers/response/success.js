module.exports = {
    friendlyName: "Success response",
    description: "Format a successful response.",

    inputs: {
        data: {
            type: "ref",
            required: true,
        },
        message: {
            type: "string",
            defaultsTo: "Thành công",
        },
        meta: {
            type: "ref",
            defaultsTo: {},
        },
    },

    exits: {
        success: {
            description: "Trả về response thành công",
        },
    },

    fn: async function (inputs) {
        return {
            data: inputs.data,
            meta: inputs.meta,
            error: null,
            message: inputs.message,
        };
    },
};
