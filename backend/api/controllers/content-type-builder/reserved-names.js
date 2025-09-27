module.exports = {
    friendlyName: "Get reserved Names",
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
        const reservedNames = await sails.helpers.schema.getreservedNames(
            inputs.name,
        );

        return exits.success({
            data: { reservedNames },
        });
    },
};
