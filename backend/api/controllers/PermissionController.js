const responseHelper = require('../../utils/responseHelper');

module.exports = {
    findAll: async (req, res) => {
        try {
            const permissions = await Permission.find();
            return res.status(200).json(responseHelper.success(permissions, 'Lấy danh sách permission thành công'));
        } catch (err) {
            return res.status(500).json(responseHelper.serverError(err));
        }
    },

    findOne: async (req, res) => {
        try {
            const permission = await Permission.findOne({ id: req.params.id });
            if (!permission) {
                return res.status(404).json(responseHelper.notFound('Không tìm thấy permission'));
            }
            return res.status(200).json(responseHelper.success(permission, 'Lấy permission thành công'));
        } catch (err) {
            return res.status(500).json(responseHelper.serverError(err));
        }
    },

    create: async (req, res) => {
        try {
            const { name, description } = req.body;

            const existing = await Permission.findOne({ name });
            if (existing) {
                return res.status(400).json(responseHelper.badRequest('Permission đã tồn tại'));
            }

            const newPermission = await Permission.create({ name, description }).fetch();
            return res.status(201).json(responseHelper.success(newPermission, 'Tạo permission thành công'));
        } catch (err) {
            return res.status(500).json(responseHelper.serverError(err));
        }
    },

    update: async (req, res) => {
        try {
            const updated = await Permission.updateOne({ id: req.params.id }).set(req.body);
            if (!updated) {
                return res.status(404).json(responseHelper.notFound('Không tìm thấy permission để cập nhật'));
            }
            return res.status(200).json(responseHelper.success(updated, 'Cập nhật permission thành công'));
        } catch (err) {
            return res.status(500).json(responseHelper.serverError(err));
        }
    },

    delete: async (req, res) => {
        try {
            const deleted = await Permission.destroyOne({ id: req.params.id });
            if (!deleted) {
                return res.status(404).json(responseHelper.notFound('Không tìm thấy permission để xoá'));
            }
            return res.status(200).json(responseHelper.success(deleted, 'Xoá permission thành công'));
        } catch (err) {
            return res.status(500).json(responseHelper.serverError(err));
        }
    }
};
