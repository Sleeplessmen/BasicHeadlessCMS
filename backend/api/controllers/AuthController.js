const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const responseHelper = require('../../utils/responseHelper');

module.exports = {
    register: async function (req, res) {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
                role: Joi.string().valid('user', 'editor').default('user')
            });

            const result = schema.validate(req.body, { stripUnknown: true });
            if (result.error) {
                console.warn('🛑 Validate thất bại:', result.error.details);
                return res.status(400).json(responseHelper.validationError(result.error));
            }

            const { email, password, role } = result.value;
            console.log('📥 Payload hợp lệ:', { email, role });

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                console.warn('❌ Email đã tồn tại:', email);
                return res.status(409).json(responseHelper.errorResponse('Email đã được đăng ký', 'EMAIL_EXISTS'));
            }

            const roleDoc = await Role.findOne({ name: role });
            if (!roleDoc) {
                console.warn('⚠️ Vai trò không tồn tại:', role);
                return res.status(400).json(responseHelper.notFound(`Vai trò '${role}' không tồn tại`));
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('🔐 Password đã hash');

            const newUser = await User.create({
                email,
                password: hashedPassword,
                role: roleDoc.id
            }).fetch();

            console.log('✅ User đã được tạo:', { id: newUser.id, email: newUser.email });

            const token = jwt.sign(
                { userId: newUser.id },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            return res.status(201).json(responseHelper.success({
                token,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    role: roleDoc.name
                }
            }, 'Đăng ký thành công'));

        } catch (err) {
            console.error('💥 Lỗi trong register:', err);
            return res.status(500).json(responseHelper.serverError(err));
        }
    },

    login: async function (req, res) {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                console.warn('🛑 Validate thất bại:', error.details);
                return res.status(400).json(responseHelper.validationError(error));
            }

            const { email, password } = value;
            console.log('📥 Payload login:', { email });

            const user = await User.findOne({ email }).populate('role');
            if (!user) {
                console.warn('❌ Không tìm thấy user:', email);
                return res.status(401).json(responseHelper.notFound('Email không tồn tại'));
            }

            console.log('👤 User tìm được:', {
                id: user.id,
                email: user.email,
                role: user.role ? user.role.name : null
            });

            if (!user.role) {
                console.warn('⚠️ User chưa được gán role');
                return res.status(403).json(responseHelper.unauthorized('Người dùng chưa được gán role'));
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.warn('🔐 Sai mật khẩu cho user:', email);
                return res.status(401).json(responseHelper.unauthorized('Sai mật khẩu'));
            }

            const token = jwt.sign(
                { id: user.id, role: user.role.name },
                process.env.JWT_SECRET,
                { expiresIn: '2d' }
            );

            console.log('✅ Đăng nhập thành công:', { userId: user.id });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 2 * 24 * 60 * 60 * 1000 // 2 ngày
            });

            return res.status(200).json(responseHelper.success({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role.name
                }
            }, 'Đăng nhập thành công'));

        } catch (err) {
            console.error('💥 Lỗi trong login:', err);
            return res.status(500).json(responseHelper.serverError(err));
        }
    },

    logout: async function (req, res) {
        try {
            const hasToken =
                (req.cookies && req.cookies.token) ||
                (req.headers.authorization && req.headers.authorization.startsWith('Bearer '));

            console.log('📤 Logout request nhận được - Có token không?', !!hasToken);

            if (!hasToken) {
                return res.status(200).json(
                    responseHelper.success(null, 'Bạn đã đăng xuất hoặc chưa đăng nhập')
                );
            }

            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });

            console.log('🧹 Token đã được xóa khỏi cookie');
            return res.status(200).json(
                responseHelper.success(null, 'Đăng xuất thành công')
            );

        } catch (err) {
            console.error('❌ Lỗi trong logout:', err);
            return res.status(500).json(responseHelper.serverError(err));
        }
    },

    me: async function (req, res) {
        try {
            if (req.user && req.user.id) {
                console.log('📥 Yêu cầu lấy thông tin user - userId:', req.user.id);
            }

            const user = await User.findOne({ id: req.user.id }).populate('role');

            if (!user) {
                console.warn('❌ Không tìm thấy user với ID:', req.user.id);
                return res.status(404).json(responseHelper.notFound('Không tìm thấy người dùng'));
            }

            if (!user.role) {
                console.warn('⚠️ User không có role:', user.email);
                return res.status(400).json(responseHelper.badRequest('Người dùng chưa được gán vai trò'));
            }

            const role = await Role.findOne({ id: user.role.id }).populate('permissions');

            // console.log(`👤 Thông tin user '${user.email}' - Vai trò: '${role.name}' - Permissions:`, role.permissions.map(p => p.name));

            return res.status(200).json(responseHelper.success({
                _id: user.id,
                email: user.email,
                role: {
                    name: role.name,
                    permissions: role.permissions.map(p => p.name)
                }
            }));

        } catch (error) {
            console.error('❌ Lỗi trong me:', error);
            return res.status(500).json(responseHelper.serverError(error));
        }
    },
};
