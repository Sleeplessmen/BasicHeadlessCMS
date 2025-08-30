const Joi = require("joi");
const {
    success,
    validationError,
    serverError,
    notFound,
    errorResponse,
} = require("../../utils/response");

module.exports = {
    // GET /roles?detail=true
    findAll: async (req, res) => {
        try {
            const isDetail = req.query.detail === "true";

            const roles = await Role.find().populate("permissions");

            const mapped = roles.map((role) => ({
                id: role.id,
                name: role.name,
                description: role.description,
                permissions: isDetail
                    ? role.permissions.map((p) => ({
                          name: p.name,
                          description: p.description,
                      }))
                    : role.permissions.map((p) => p.name),
            }));

            return res
                .status(200)
                .json(success(mapped, "Lấy danh sách vai trò thành công"));
        } catch (err) {
            return res.status(500).json(serverError(err));
        }
    },

    // GET /roles/:id?detail=true
    findOne: async (req, res) => {
        try {
            const isDetail = req.query.detail === "true";

            const role = await Role.findOne({ id: req.params.id }).populate(
                "permissions"
            );
            if (!role) {
                return res
                    .status(404)
                    .json(
                        notFound(`Vai trò ID ${req.params.id} không tồn tại`)
                    );
            }

            const result = {
                id: role.id,
                name: role.name,
                description: role.description,
                permissions: isDetail
                    ? role.permissions.map((p) => ({
                          name: p.name,
                          description: p.description,
                      }))
                    : role.permissions.map((p) => p.name),
            };

            return res
                .status(200)
                .json(success(result, "Lấy vai trò thành công"));
        } catch (err) {
            return res.status(500).json(serverError(err));
        }
    },

    // POST /roles
    create: async (req, res) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().allow(""),
        });

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(validationError(error));
        }

        try {
            const role = await Role.create(value).fetch();
            return res
                .status(201)
                .json(success(role, "Tạo vai trò thành công"));
        } catch (err) {
            return res.status(500).json(serverError(err));
        }
    },

    // PUT /roles/:id
    update: async (req, res) => {
        const schema = Joi.object({
            name: Joi.string().optional(),
            description: Joi.string().allow("").optional(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(validationError(error));
        }

        try {
            const updated = await Role.updateOne({ id: req.params.id }).set(
                value
            );
            if (!updated) {
                return res
                    .status(404)
                    .json(
                        notFound(`Vai trò ID ${req.params.id} không tồn tại`)
                    );
            }
            return res
                .status(200)
                .json(success(updated, "Cập nhật vai trò thành công"));
        } catch (err) {
            return res.status(500).json(serverError(err));
        }
    },

    // DELETE /roles/:id
    delete: async (req, res) => {
        try {
            const deleted = await Role.destroyOne({ id: req.params.id });
            if (!deleted) {
                return res
                    .status(404)
                    .json(
                        notFound(`Vai trò ID ${req.params.id} không tồn tại`)
                    );
            }
            return res
                .status(200)
                .json(success(deleted, "Xoá vai trò thành công"));
        } catch (err) {
            return res.status(500).json(serverError(err));
        }
    },

    // PUT /roles/:id/permission
    assignPerm: async (req, res) => {
        const schema = Joi.object({
            permissions: Joi.array().items(Joi.string()).required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(validationError(error));
        }

        try {
            const role = await Role.findOne({ id: req.params.id });
            if (!role) {
                return res
                    .status(404)
                    .json(
                        notFound(`Vai trò ID ${req.params.id} không tồn tại`)
                    );
            }

            const foundPermissions = await Permission.find({
                name: value.permissions,
            });
            if (foundPermissions.length !== value.permissions.length) {
                return res
                    .status(400)
                    .json(
                        errorResponse(
                            "Một hoặc nhiều quyền không hợp lệ",
                            "INVALID_PERMISSIONS",
                            "Vui lòng kiểm tra danh sách quyền được cung cấp"
                        )
                    );
            }

            const permissionIds = foundPermissions.map((p) => p.id);
            await Role.updateOne({ id: req.params.id }).set({
                permissions: permissionIds,
            });

            const updatedRole = await Role.findOne({
                id: req.params.id,
            }).populate("permissions");
            const formatted = {
                id: updatedRole.id,
                name: updatedRole.name,
                description: updatedRole.description,
                permissions: updatedRole.permissions.map((p) => ({
                    name: p.name,
                    description: p.description,
                })),
            };

            return res
                .status(200)
                .json(success(formatted, "Gán quyền cho vai trò thành công"));
        } catch (err) {
            return res.status(500).json(serverError(err));
        }
    },
};
