const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { ValidationError, ConflictError } = require("../../../../errors");

module.exports = {
    friendlyName: "Register",
    description: "Đăng ký tài khoản mới",

    inputs: {
        username: { type: "string", required: true, minLength: 2 },
        email: { type: "string", required: true, isEmail: true },
        password: { type: "string", required: true, minLength: 6 },
    },

    fn: async function (inputs) {
        const schema = Joi.object({
            username: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });

        const { error, value } = schema.validate(inputs);
        if (error) {
            throw new ValidationError(error.details[0].message);
        }

        const existing = await User.findOne({ email: value.email });
        if (existing) {
            throw new ConflictError("Email đã được sử dụng");
        }

        const hashedPassword = await bcrypt.hash(value.password, 10);

        const newUser = await User.create({
            username: value.username,
            email: value.email,
            password: hashedPassword,
            confirmed: false,
            blocked: false,
        }).fetch();

        return this.res.success(
            {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
            "Đăng ký thành công",
        );
    },
};
