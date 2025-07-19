const {
    success,
    serverError,
    notFound,
    badRequest,
    validationError
} = require('../../utils/responseHelper');

module.exports = {
    // GET /permissions
    findAll: async (req, res) => {
        try {
            const permissions = await Permission.find();
            return res.status(200).json(success(permissions, 'Lấy danh sách permission thành công'));
        } catch (err) {
            return res.status(500).json(serverError(err, 'PermissionController.findAll'));
        }
    },

    // GET /permissions/:id
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id || id.length !== 24) {
                return res.status(400).json(validationError(null, 'ID không hợp lệ'));
            }

            const permission = await Permission.findOne({ id });
            if (!permission) {
                return res.status(404).json(notFound('Không tìm thấy permission', `ID ${id}`));
            }

            return res.status(200).json(success(permission, 'Lấy permission thành công'));
        } catch (err) {
            return res.status(500).json(serverError(err, 'PermissionController.findOne'));
        }
    },

    // POST /permissions
    create: async (req, res) => {
        try {
            const { name, description } = req.body;
            if (!name) {
                return res.status(400).json(validationError(null, 'Tên permission là bắt buộc'));
            }

            const existing = await Permission.findOne({ name });
            if (existing) {
                return res.status(409).json(badRequest('Permission đã tồn tại', `Tên '${name}' đã được sử dụng`));
            }

            const newPermission = await Permission.create({ name, description }).fetch();
            return res.status(201).json(success(newPermission, 'Tạo permission thành công'));
        } catch (err) {
            return res.status(500).json(serverError(err, 'PermissionController.create'));
        }
    },

    // PUT /permissions/:id
    update: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id || id.length !== 24) {
                return res.status(400).json(validationError(null, 'ID không hợp lệ'));
            }

            const updated = await Permission.updateOne({ id }).set(req.body);
            if (!updated) {
                return res.status(404).json(notFound('Không tìm thấy permission để cập nhật', `ID ${id}`));
            }

            return res.status(200).json(success(updated, 'Cập nhật permission thành công'));
        } catch (err) {
            return res.status(500).json(serverError(err, 'PermissionController.update'));
        }
    },

    // DELETE /permissions/:id
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id || id.length !== 24) {
                return res.status(400).json(validationError(null, 'ID không hợp lệ'));
            }

            const deleted = await Permission.destroyOne({ id });
            if (!deleted) {
                return res.status(404).json(notFound('Không tìm thấy permission để xoá', `ID ${id}`));
            }

            return res.status(200).json(success(deleted, 'Xoá permission thành công'));
        } catch (err) {
            return res.status(500).json(serverError(err, 'PermissionController.delete'));
        }
    }
};
