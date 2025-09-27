module.exports = {
    friendlyName: "Get reserved names",
    description: "Tạo danh sách các tên đảo ngược từ một tên cho trước",

    inputs: {
        name: {
            type: "string",
            required: true,
            description: "Tên gốc cần tạo phiên bản đảo ngược",
        },
    },

    exits: {
        success: {
            outputFriendlyName: "reserved names",
            outputDescription: "Danh sách các tên đảo ngược",
        },
    },

    fn: async function (inputs, exits) {
        const name = inputs.name;

        // 💡 Logic đơn giản: đảo chuỗi + viết hoa chữ đầu
        const reserved = name.split("").reverse().join("");
        const upper = name.toUpperCase();
        const lower = name.toLowerCase();

        const results = [reserved, upper, lower];

        return exits.success(results);
    },
};
