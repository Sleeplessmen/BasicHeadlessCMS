const Joi = require('joi');
const {
    successResponse,
    handleValidationError,
    handleServerError,
    notFound,
    errorResponse
} = require('../../utils/responseHelper');

module.exports = {
    // GET /roles
    findAll: async (req, res) => {
        try {
            const roles = await Role.find().populate('permissions');
            return res.status(200).json(successResponse(roles, 'Lấy danh sách vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err));
        }
    },

    // GET /roles/:id
    findOne: async (req, res) => {
        try {
            const role = await Role.findOne({ id: req.params.id }).populate('permissions');
            if (!role) {
                return res.status(404).json(notFound('Vai trò không tồn tại', `ID ${req.params.id}`));
            }
            return res.status(200).json(successResponse(role, 'Lấy vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err));
        }
    },

    // POST /roles
    create: async (req, res) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().allow('')
        });

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(handleValidationError(error));
        }

        try {
            const role = await Role.create(value).fetch();
            return res.status(201).json(successResponse(role, 'Tạo vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err));
        }
    },

    // PUT /roles/:id
    update: async (req, res) => {
        const schema = Joi.object({
            name: Joi.string().optional(),
            description: Joi.string().allow('').optional()
        });

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(handleValidationError(error));
        }

        try {
            const updated = await Role.updateOne({ id: req.params.id }).set(value);
            if (!updated) {
                return res.status(404).json(notFound('Vai trò không tồn tại', `ID ${req.params.id}`));
            }
            return res.status(200).json(successResponse(updated, 'Cập nhật vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err));
        }
    },

    // DELETE /roles/:id
    delete: async (req, res) => {
        try {
            const deleted = await Role.destroyOne({ id: req.params.id });
            if (!deleted) {
                return res.status(404).json(notFound('Vai trò không tồn tại', `ID ${req.params.id}`));
            }
            return res.status(200).json(successResponse(deleted, 'Xoá vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err));
        }
    },

    // PUT /roles/:id/permission
    assignPerm: async (req, res) => {
        const schema = Joi.object({
            permissions: Joi.array().items(Joi.string()).required()
        });

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(handleValidationError(error));
        }

        try {
            const role = await Role.findOne({ id: req.params.id });
            if (!role) {
                return res.status(404).json(notFound('Vai trò không tồn tại', `ID ${req.params.id}`));
            }

            const foundPermissions = await Permission.find({ name: value.permissions });
            if (foundPermissions.length !== value.permissions.length) {
                return res.status(400).json(errorResponse(
                    'Một hoặc nhiều quyền không hợp lệ',
                    'Vui lòng kiểm tra danh sách permission name truyền vào'
                ));
            }

            const permissionIds = foundPermissions.map(p => p.id);
            await Role.updateOne({ id: req.params.id }).set({ permissions: permissionIds });

            const updatedRole = await Role.findOne({ id: req.params.id }).populate('permissions');
            return res.status(200).json(successResponse(updatedRole, 'Gán quyền cho vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err));
        }
    }
};
