const Permission = require('../mongoose-models/Permission');
const {
    successResponse,
    handleServerError,
    notFound,
    errorResponse
} = require('../../utils/responseHelper');

module.exports = {
    // Lấy tất cả permission
    findAll: async (req, res) => {
        try {
            const permissions = await Permission.find();
            return res.status(200).json(successResponse(permissions, 'Lấy danh sách permission thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'PermissionController.findAll'));
        }
    },

    // Lấy một permission theo ID
    findOne: async (req, res) => {
        try {
            const permission = await Permission.findById(req.params.id);
            if (!permission) {
                return res.status(404).json(notFound('Không tìm thấy permission'));
            }
            return res.status(200).json(successResponse(permission, 'Lấy permission thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'PermissionController.findOne'));
        }
    },

    // Tạo permission mới
    create: async (req, res) => {
        try {
            const { name, description } = req.body;

            const existing = await Permission.findOne({ name });
            if (existing) {
                return res.status(400).json(errorResponse('Permission đã tồn tại'));
            }

            const newPermission = await Permission.create({ name, description });
            return res.status(201).json(successResponse(newPermission, 'Tạo permission thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'PermissionController.create'));
        }
    },

    // Cập nhật permission
    update: async (req, res) => {
        try {
            const updated = await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) {
                return res.status(404).json(notFound('Không tìm thấy permission để cập nhật'));
            }
            return res.status(200).json(successResponse(updated, 'Cập nhật permission thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'PermissionController.update'));
        }
    },

    // Xoá permission
    delete: async (req, res) => {
        try {
            const deleted = await Permission.findByIdAndDelete(req.params.id);
            if (!deleted) {
                return res.status(404).json(notFound('Không tìm thấy permission để xoá'));
            }
            return res.status(200).json(successResponse(deleted, 'Xoá permission thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'PermissionController.delete'));
        }
    }
};
