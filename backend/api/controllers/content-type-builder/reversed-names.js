module.exports = {
    friendlyName: "Get Reversed Names",
    description: "Lấy danh sách tên đảo ngược từ một tên cho trước",

    inputs: {
        name: {
            type: "string",
            required: true,
            description: "Tên cần đảo ngược",
        },
    },

    exits: {
        badRequest: {
            description: "Thiếu tham số name",
            responseType: "badRequest",
        },
    },

    fn: async function (inputs, exits) {
        const reversedNames = await sails.helpers.schema.getReversedNames(
            inputs.name,
        );

        return exits.success({
            data: { reversedNames },
            message: "Lấy danh sách tên ngược lại thành công",
        });
    },
};
