const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../../../../errors");

module.exports = {
    friendlyName: "Login",
    description: "Login to Admin panel",

    inputs: {
        email: {
            type: "string",
            required: true,
            isEmail: true,
            description: "Email address of the user",
        },
        password: {
            type: "string",
            required: true,
            description: "Password for the user account",
        },
    },

    exits: {
        success: {
            description: "User logged in successfully",
            responseType: "success",
        },
        badRequest: {
            description: "Invalid email or password",
            responseType: "error",
        },
    },

    fn: async function (inputs, exits) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error, value } = schema.validate(inputs);
        if (error)
            return exits.badRequest(
                new BadRequestError(error.details[0].message),
            );

        const { email, password } = value;

        const user = await AdminUser.findOne({ email }).populate("roles");
        if (!user)
            return exits.badRequest(
                new BadRequestError("email or password are incorrect"),
            );

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return exits.badRequest(
                new BadRequestError("email or password are incorrect"),
            );

        const accessToken = jwt.sign(
            { id: user.id, type: "access" },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" },
        );

        const refreshToken = jwt.sign(
            { id: user.id, type: "refresh" },
            process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
            { expiresIn: "30d" },
        );

        await AdminUser.updateOne({ id: user.id }).set({ isActive: true });
        await RefreshToken.create({
            user: user.id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        const formattedUser = await sails.helpers.auth.formatUser(user);

        return exits.success({
            data: { user: formattedUser, accessToken, refreshToken },
            message: "Đăng nhập thành công",
        });
    },
};
