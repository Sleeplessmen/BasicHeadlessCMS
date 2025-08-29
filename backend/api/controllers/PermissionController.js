const { success, errorResponse } = require("../../utils/responseHelper");
const {
    ValidationError,
    NotFoundError,
    ConflictError,
    ApplicationError,
} = require("../../utils/errors");

module.exports = {
    // GET /permissions
    findAll: async (req, res) => {
        try {
            const permissions = await Permission.find();
            return res
                .status(200)
                .json(
                    success(permissions, "Lấy danh sách permission thành công")
                );
        } catch (err) {
            return res.status(500).json(
                errorResponse(
                    new ApplicationError("Lỗi khi lấy danh sách", {
                        source: "PermissionController.findAll",
                        raw: err,
                    })
                )
            );
        }
    },

    // GET /permissions/:id
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id || id.length !== 24) {
                throw new ValidationError("ID không hợp lệ");
            }

            const permission = await Permission.findOne({ id });
            if (!permission) {
                throw new NotFoundError("Không tìm thấy permission", { id });
            }

            return res
                .status(200)
                .json(success(permission, "Lấy permission thành công"));
        } catch (err) {
            return res.status(err.status || 500).json(errorResponse(err));
        }
    },

    // POST /permissions
    create: async (req, res) => {
        try {
            const { name, description } = req.body;
            if (!name) {
                throw new ValidationError("Tên permission là bắt buộc");
            }

            const existing = await Permission.findOne({ name });
            if (existing) {
                throw new ConflictError("Permission đã tồn tại", { name });
            }

            const newPermission = await Permission.create({
                name,
                description,
            }).fetch();
            return res
                .status(201)
                .json(success(newPermission, "Tạo permission thành công"));
        } catch (err) {
            return res.status(err.status || 500).json(errorResponse(err));
        }
    },

    // PUT /permissions/:id
    update: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id || id.length !== 24) {
                throw new ValidationError("ID không hợp lệ");
            }

            const updated = await Permission.updateOne({ id }).set(req.body);
            if (!updated) {
                throw new NotFoundError(
                    "Không tìm thấy permission để cập nhật",
                    { id }
                );
            }

            return res
                .status(200)
                .json(success(updated, "Cập nhật permission thành công"));
        } catch (err) {
            return res.status(err.status || 500).json(errorResponse(err));
        }
    },

    // DELETE /permissions/:id
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id || id.length !== 24) {
                throw new ValidationError("ID không hợp lệ");
            }

            const deleted = await Permission.destroyOne({ id });
            if (!deleted) {
                throw new NotFoundError("Không tìm thấy permission để xoá", {
                    id,
                });
            }

            return res
                .status(200)
                .json(success(deleted, "Xoá permission thành công"));
        } catch (err) {
            return res.status(err.status || 500).json(errorResponse(err));
        }
    },
};
