module.exports = {
    friendlyName: "Login",
    description: "Đăng nhập tài khoản",

    inputs: {
        email: { type: "string", required: true, isEmail: true },
        password: { type: "string", required: true },
    },

    exits: {
        success: {
            description: "Đăng nhập thành công",
        },
        invalid: {
            statusCode: 401,
            description: "Email hoặc mật khẩu không đúng",
        },
    },

    fn: async function (inputs, exits) {
        const user = await User.findOne({ email: inputs.email });
        if (!user) return exits.invalid();

        const match = await sails.helpers.passwords.checkPassword(
            inputs.password,
            user.password,
        );
        if (!match) return exits.invalid();

        // Tuỳ bạn muốn dùng JWT hay session
        this.req.session.userId = user.id;

        return exits.success({ user });
    },
};
