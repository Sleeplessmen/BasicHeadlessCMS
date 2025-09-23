const jwt = require("jsonwebtoken");

module.exports = {
    friendlyName: "Login",
    description: "Login",

    inputs: {
        email: { type: "string", required: true, isEmail: true },
        password: { type: "string", required: true },
    },

    exits: {
        success: {
            description: "Login successfully",
            responseType: "success",
        },
        invalid: {
            description: "Email or password was incorrect",
            responseType: "error",
        },
    },

    fn: async function (inputs, exits) {
        const user = await User.findOne({ email: inputs.email });
        if (!user) {
            return exits.invalid({
                status: 401,
                name: "InvalidCredentials",
                message: "Email or password was incorrect",
            });
        }

        const match = await sails.helpers.passwords.checkPassword(
            inputs.password,
            user.password,
        );
        if (!match) {
            return exits.invalid({
                status: 401,
                name: "InvalidCredentials",
                message: "Email or password was incorrect",
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            sails.config.custom.jwtSecret,
            { expiresIn: "7d" },
        );

        return exits.success({
            data: { user, token },
            message: "Login successfully",
        });
    },
};
