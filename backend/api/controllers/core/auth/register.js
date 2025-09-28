const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { ConflictError, ValidationError } = require("../../../../errors");

module.exports = {
    friendlyName: "Register",
    description: "Register to Admin panel",

    inputs: {
        firstname: {
            type: "string",
            required: true,
            minLength: 2,
            description: "First name of the user",
        },
        lastname: {
            type: "string",
            required: true,
            minLength: 2,
            description: "Last name of the user",
        },
        email: {
            type: "string",
            required: true,
            isEmail: true,
            description: "Email address of the user",
        },
        password: {
            type: "string",
            required: true,
            minLength: 6,
            description: "Password for the user account",
        },
        // roles: {
        //     type: ["string"],
        //     regex: /^[0-9a-fA-F]{24}$/,
        //     description: "Array of role IDs (optional)",
        // },
    },

    exits: {
        success: {
            description: "User registered successfully",
            responseType: "success",
        },
        badRequest: {
            description: "Invalid input provided",
            responseType: "error",
        },
        conflict: {
            description: "Email already exists",
            responseType: "error",
        },
    },

    fn: async function (inputs, exits) {
        const schema = Joi.object({
            firstname: Joi.string().min(2).required(),
            lastname: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            // roles: Joi.array()
            //     .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
            //     .optional(),
        });

        const { error, value } = schema.validate(inputs);
        if (error)
            return exits.badRequest(
                new ValidationError(error.details[0].message),
            );

        const { firstname, lastname, email, password } = value;

        const existing = await AdminUser.findOne({ email });
        if (existing)
            return exits.conflict(new ConflictError("Email đã tồn tại"));

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await AdminUser.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            isActive: false,
        }).fetch();

        const formattedUser = await sails.helpers.auth.formatUser(newUser);

        return exits.success({
            data: formattedUser,
            message: "Đăng ký thành công",
        });
    },
};
