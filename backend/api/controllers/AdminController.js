const {
    successResponse,
    handleValidationError,
    handleServerError,
    notFound,
    errorResponse
} = require('../../utils/responseHelper');

module.exports = {
    // GET /users
    findAll: async (req, res) => {
        try {
            const users = await User.find().populate('role');
            return res.status(200).json(successResponse(users, 'Lấy danh sách người dùng thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'AdminController.findAll'));
        }
    },

    // GET /users/:id
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id || id.length !== 24) {
                return res.status(400).json(handleValidationError(null, 'ID không hợp lệ'));
            }

            const user = await User.findOne({ id }).populate('role');
            if (!user) {
                return res.status(404).json(notFound('Không tìm thấy người dùng', `ID ${id}`));
            }

            return res.status(200).json(successResponse(user, 'Lấy thông tin người dùng thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'AdminController.findOne'));
        }
    },

    // POST /users
    create: async (req, res) => {
        try {
            const { email, password, role } = req.body;

            if (!email || !password) {
                return res.status(400).json(handleValidationError(null, 'Thiếu email hoặc mật khẩu'));
            }

            const existing = await User.findOne({ email });
            if (existing) {
                return res.status(409).json(errorResponse('Email đã tồn tại', `Email ${email} đã được đăng ký`));
            }

            const roleRecord = await Role.findOne({ name: role || 'user' });
            if (!roleRecord) {
                return res.status(400).json(errorResponse(`Vai trò '${role}' không tồn tại`, 'Vui lòng chọn lại vai trò hợp lệ'));
            }

            const newUser = await User.create({
                email,
                password, // raw password, sẽ được hash tự động
                role: roleRecord.id
            }).fetch();

            return res.status(201).json(successResponse({
                id: newUser.id,
                email: newUser.email,
                role: roleRecord.name
            }, 'Tạo người dùng thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'AdminController.create'));
        }
    },

    // PUT /users/:id
    update: async (req, res) => {
        try {
            const { email, password } = req.body;
            const updateData = {};

            if (email) updateData.email = email;
            if (password) updateData.password = password;

            const updated = await User.updateOne({ id: req.params.id }).set(updateData);
            if (!updated) {
                return res.status(404).json(notFound('Người dùng không tồn tại', `ID ${req.params.id}`));
            }

            return res.status(200).json(successResponse(updated, 'Cập nhật người dùng thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'AdminController.update'));
        }
    },

    // DELETE /users/:id
    delete: async (req, res) => {
        try {
            const deleted = await User.destroyOne({ id: req.params.id });
            if (!deleted) {
                return res.status(404).json(notFound('Người dùng không tồn tại', `ID ${req.params.id}`));
            }

            return res.status(200).json(successResponse(deleted, 'Xoá người dùng thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'AdminController.delete'));
        }
    },

    // PUT /users/:id/role
    assignRole: async (req, res) => {
        try {
            const { role } = req.body;
            if (!role) {
                return res.status(400).json(handleValidationError(null, 'Vai trò là bắt buộc'));
            }

            const roleDoc = await Role.findOne({ name: role });
            if (!roleDoc) {
                return res.status(400).json(errorResponse(`Vai trò '${role}' không tồn tại`, 'Vui lòng chọn lại vai trò hợp lệ'));
            }

            const user = await User.updateOne({ id: req.params.id }).set({ role: roleDoc.id });
            if (!user) {
                return res.status(404).json(notFound('Người dùng không tồn tại', `ID ${req.params.id}`));
            }

            return res.status(200).json(successResponse({
                id: user.id,
                email: user.email,
                role: roleDoc.name
            }, 'Gán vai trò thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'AdminController.assignRole'));
        }
    }
};
