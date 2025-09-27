const jwt = require("jsonwebtoken");

module.exports = {
    friendlyName: "Register",
    description: "Register new user",

    inputs: {
        username: { type: "string", required: true, minLength: 3 },
        email: { type: "string", required: true, isEmail: true },
        password: { type: "string", required: true, minLength: 6 },
    },

    exits: {
        success: {
            description: "User registered successfully",
            responseType: "success",
        },
        emailInUse: {
            description: "Email address is already in use",
            responseType: "error",
        },
        usernameInUse: {
            description: "Username is already in use",
            responseType: "error",
        },
    },

    fn: async function (inputs, exits) {
        const existingEmail = await User.findOne({ email: inputs.email });
        if (existingEmail) {
            return exits.emailInUse({
                status: 409,
                name: "EmailInUse",
                message: "Email address is already in use",
            });
        }

        const existingUsername = await User.findOne({
            username: inputs.username,
        });
        if (existingUsername) {
            return exits.usernameInUse({
                status: 409,
                name: "UsernameInUse",
                message: "Username is already in use",
            });
        }

        const hashedPassword = await sails.helpers.passwords.hashPassword(
            inputs.password,
        );

        const newUser = await User.create({
            username: inputs.username,
            email: inputs.email,
            password: hashedPassword,
        }).fetch();

        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            sails.config.custom.jwtSecret,
            { expiresIn: "7d" },
        );

        return exits.success({
            data: { user: newUser, token },
            message: "User registered successfully",
        });
    },
};
