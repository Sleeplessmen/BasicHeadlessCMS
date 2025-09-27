const bcrypt = require("bcryptjs");

module.exports = {
    friendlyName: "Hash password",
    description: "Hash mật khẩu người dùng trước khi lưu vào database.",

    inputs: {
        password: {
            type: "string",
            required: true,
        },
    },

    exits: {
        success: {
            description: "Trả về chuỗi mật khẩu đã hash",
        },
    },

    fn: async function (inputs) {
        const saltRounds = 10;

        const hashed = await bcrypt.hash(inputs.password, saltRounds);

        return hashed;
    },
};
