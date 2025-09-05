const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ConflictError,
    ValidationError,
} = require("../../errors");

function formatUser(user) {
    return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        isActive: user.isActive,
        roles: (user.roles || []).map((r) => ({
            id: r.id,
            name: r.name,
            code: r.code,
        })),
    };
}

module.exports = {
    register: async function (req, res) {
        const schema = Joi.object({
            firstname: Joi.string().min(2).required(),
            lastname: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            roles: Joi.array()
                .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
                .optional(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) throw new ValidationError(error.details[0].message);

        const { firstname, lastname, email, password } = value;

        const existing = await AdminUser.findOne({ email });
        if (existing) throw new ConflictError("Email đã tồn tại");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await AdminUser.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            isActive: false,
        }).fetch();

        return res.ok(
            await sails.helpers.response.success.with({
                data: formatUser(newUser),
                message: "Đăng ký thành công",
            }),
        );
    },

    login: async function (req, res) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) throw new BadRequestError(error.details[0].message);

        const { email, password } = value;

        const user = await AdminUser.findOne({ email }).populate("roles");
        if (!user) throw new BadRequestError("Email hoặc mật khẩu không đúng");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new BadRequestError("Email hoặc mật khẩu không đúng");

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                roles: (user.roles || []).map((r) => ({
                    id: r.id,
                    name: r.name,
                    code: r.code,
                })),
            },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1d" },
        );

        return res.ok(
            await sails.helpers.response.success.with({
                data: {
                    user: formatUser({ ...user, isActive: true }),
                    token,
                },
                message: "Đăng nhập thành công",
            }),
        );
    },

    logout: async function (req, res) {
        if (!req.user || !req.token)
            throw new UnauthorizedError("Bạn chưa đăng nhập");

        await AdminUser.updateOne({ id: req.user.id }).set({ isActive: false });

        const decoded = jwt.decode(req.token);
        const expiredAt = new Date(decoded.exp * 1000);

        await BlacklistToken.create({ token: req.token, expiredAt });

        return res.ok(
            await sails.helpers.response.success.with({
                data: {},
                message: "Đăng xuất thành công",
            }),
        );
    },

    // fixing
    me: async function (req, res) {
        if (!req.user || !req.user.id)
            throw new UnauthorizedError("Không tìm thấy thông tin người dùng");

        const user = await AdminUser.findOne({ id: req.user.id }).populate(
            "roles",
        );
        if (!user) throw new NotFoundError("Người dùng không tồn tại");

        return res.ok(
            await sails.helpers.response.success.with({
                data: formatUser(user),
                message: "Lấy thông tin người dùng thành công",
            }),
        );
    },
};
