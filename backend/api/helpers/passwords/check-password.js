const bcrypt = require("bcryptjs");

module.exports = {
    friendlyName: "Check password",
    description: "So sánh mật khẩu người dùng nhập với mật khẩu đã hash.",

    inputs: {
        passwordAttempt: {
            type: "string",
            required: true,
        },
        hashedPassword: {
            type: "string",
            required: true,
        },
    },

    exits: {
        success: {
            description: "Password hợp lệ hoặc không hợp lệ",
        },
    },

    fn: async function (inputs) {
        return await bcrypt.compare(
            inputs.passwordAttempt,
            inputs.hashedPassword,
        );
    },
};
