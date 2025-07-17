const User = require('../mongoose-models/User');
const Role = require('../mongoose-models/Role');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const {
    successResponse,
    handleValidationError,
    handleServerError,
    notFound
} = require('../../utils/responseHelper');

module.exports = {
    // GET /users
    findAll: async (req, res) => {
        try {
            const users = await User.find().populate('role');
            return res.status(200).json(successResponse(users, 'Lấy danh sách người dùng thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'UserController.findAll'));
        }
    },

    // GET /users/:id
    findOne: async (req, res) => {
        try {
            const schema = Joi.object({
                id: Joi.string().length(24).required()
            });

            const { error, value } = schema.validate(req.params);
            if (error) {
                return res.status(400).json(handleValidationError(error, 'ID không hợp lệ'));
            }

            const user = await User.findById(value.id).populate('role');
            if (!user) {
                return res.status(404).json(notFound('Không tìm thấy người dùng', `ID ${value.id}`));
            }

            return res.status(200).json(successResponse(user, 'Lấy thông tin người dùng thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'UserController.findOne'));
        }
    },

    // POST /users
    create: async (req, res) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
                role: Joi.string().valid('user', 'editor', 'admin').default('user')
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json(handleValidationError(error));
            }

            const existing = await User.findOne({ email: value.email });
            if (existing) {
                return res.status(409).json(errorResponse(
                    'Email đã tồn tại',
                    `Email ${value.email} đã được đăng ký`
                ));
            }

            const roleDoc = await Role.findOne({ name: value.role });
            if (!roleDoc) {
                return res.status(400).json(errorResponse(
                    `Vai trò '${value.role}' không tồn tại`,
                    'Vui lòng chọn lại vai trò hợp lệ'
                ));
            }

            const hashedPassword = await bcrypt.hash(value.password, 10);
            const newUser = new User({
                email: value.email,
                password: hashedPassword,
                role: roleDoc._id
            });

            await newUser.save();

            return res.status(201).json(successResponse({
                _id: newUser._id,
                email: newUser.email,
                role: roleDoc.name
            }, 'Tạo người dùng thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'UserController.create'));
        }
    },

    // PUT /users/:id
    update: async (req, res) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().optional(),
                password: Joi.string().min(6).optional()
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json(handleValidationError(error));
            }

            if (value.password) {
                value.password = await bcrypt.hash(value.password, 10);
            }

            const updated = await User.findByIdAndUpdate(req.params.id, value, { new: true }).populate('role');
            if (!updated) {
                return res.status(404).json(notFound('Người dùng không tồn tại', `ID ${req.params.id}`));
            }

            return res.status(200).json(successResponse(updated, 'Cập nhật người dùng thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'UserController.update'));
        }
    },

    // DELETE /users/:id
    delete: async (req, res) => {
        try {
            const deleted = await User.findByIdAndDelete(req.params.id);
            if (!deleted) {
                return res.status(404).json(notFound('Người dùng không tồn tại', `ID ${req.params.id}`));
            }

            return res.status(200).json(successResponse(deleted, 'Xoá người dùng thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'UserController.delete'));
        }
    },

    // PUT /users/:id/role
    assignRole: async (req, res) => {
        try {
            const schema = Joi.object({
                role: Joi.string().required()
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json(handleValidationError(error));
            }

            const roleDoc = await Role.findOne({ name: value.role });
            if (!roleDoc) {
                return res.status(400).json(errorResponse(
                    `Vai trò '${value.role}' không tồn tại`,
                    'Vui lòng chọn lại vai trò hợp lệ'
                ));
            }

            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json(notFound('Người dùng không tồn tại', `ID ${req.params.id}`));
            }

            user.role = roleDoc._id;
            await user.save();

            return res.status(200).json(successResponse({
                _id: user._id,
                email: user.email,
                role: roleDoc.name
            }, 'Gán vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'UserController.assignRole'));
        }
    }
};
