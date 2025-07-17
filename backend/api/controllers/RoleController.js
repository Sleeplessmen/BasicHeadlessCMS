const Role = require('../mongoose-models/Role');
const Permission = require('../mongoose-models/Permission');
const Joi = require('joi');
const {
    successResponse,
    handleValidationError,
    handleServerError,
    notFound
} = require('../../utils/responseHelper');

module.exports = {
    // GET /roles
    findAll: async (req, res) => {
        try {
            const roles = await Role.find().populate('permissions');
            return res.status(200).json(successResponse(roles, 'Lấy danh sách vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'RoleController.findAll'));
        }
    },

    // GET /roles/:id
    findOne: async (req, res) => {
        try {
            const role = await Role.findById(req.params.id).populate('permissions');
            if (!role) return res.status(404).json(notFound('Vai trò không tồn tại', `ID ${req.params.id}`));

            return res.status(200).json(successResponse(role, 'Lấy vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'RoleController.findOne'));
        }
    },

    // POST /roles
    create: async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                description: Joi.string().allow('')
            });

            const { error, value } = schema.validate(req.body);
            if (error) return res.status(400).json(handleValidationError(error));

            const role = new Role(value);
            await role.save();

            return res.status(201).json(successResponse(role, 'Tạo vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'RoleController.create'));
        }
    },

    // PUT /roles/:id
    update: async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().optional(),
                description: Joi.string().allow('').optional()
            });

            const { error, value } = schema.validate(req.body);
            if (error) return res.status(400).json(handleValidationError(error));

            const updated = await Role.findByIdAndUpdate(req.params.id, value, { new: true });
            if (!updated) return res.status(404).json(notFound('Vai trò không tồn tại', `ID ${req.params.id}`));

            return res.status(200).json(successResponse(updated, 'Cập nhật vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'RoleController.update'));
        }
    },

    // DELETE /roles/:id
    delete: async (req, res) => {
        try {
            const deleted = await Role.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json(notFound('Vai trò không tồn tại', `ID ${req.params.id}`));

            return res.status(200).json(successResponse(deleted, 'Xoá vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'RoleController.delete'));
        }
    },

    // PUT /roles/:id/permission
    assignPerm: async (req, res) => {
        try {
            const schema = Joi.object({
                permissions: Joi.array().items(Joi.string()).required()
            });

            const { error, value } = schema.validate(req.body);
            if (error) return res.status(400).json(handleValidationError(error));

            const role = await Role.findById(req.params.id);
            if (!role) return res.status(404).json(notFound('Vai trò không tồn tại', `ID ${req.params.id}`));

            // Tìm danh sách permissions theo name
            const foundPermissions = await Permission.find({ name: { $in: value.permissions } });

            if (foundPermissions.length !== value.permissions.length) {
                return res.status(400).json(errorResponse(
                    'Một hoặc nhiều quyền không hợp lệ',
                    'Vui lòng kiểm tra danh sách permission name truyền vào'
                ));
            }

            // Map danh sách permission thành danh sách ID
            role.permissions = foundPermissions.map(p => p._id);
            await role.save();

            return res.status(200).json(successResponse(role, 'Gán quyền cho vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'RoleController.assignPerm'));
        }
    }

};
