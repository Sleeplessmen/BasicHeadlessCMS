const {
    NotFoundError,
    ValidationError,
    ConflictError,
    ApplicationError,
    BaseError,
} = require("../../errors");

// build code từ name
const buildRoleCode = (name) =>
    `strapi-${name.toLowerCase().replace(/\s+/g, "-")}`;

// Helper: group permissions giống AdminPermissionController
function groupPermissions(permissions) {
    const grouped = { plugins: {}, contentTypes: {}, settings: {} };

    for (const { id, action, subject, description } of permissions || []) {
        if (!subject) continue;

        const [prefix, name] = subject.split("::");
        if (!name) continue;

        const entry = { id, action, subject, description };

        switch (prefix) {
            case "plugin":
                grouped.plugins[name] ??= [];
                grouped.plugins[name].push(entry);
                break;
            case "api":
                grouped.contentTypes[name] ??= [];
                grouped.contentTypes[name].push(entry);
                break;
            case "admin":
                grouped.settings[name] ??= [];
                grouped.settings[name].push(entry);
                break;
        }
    }

    return grouped;
}

// format role output
const formatRole = (role) => ({
    id: role.id,
    name: role.name,
    code: role.code,
    description: role.description,
    userCount: role.users?.length ?? 0,
});

module.exports = {
    find: async (req, res) => {
        try {
            const roles = await AdminRole.find()
                .populate("permissions")
                .populate("users");

            return res.ok(
                await sails.helpers.response.success.with({
                    data: roles.map(formatRole),
                    message: "Lấy danh sách roles thành công",
                }),
            );
        } catch (err) {
            sails.log.error("AdminRoleController.find - lỗi:", err);
            return res.status(err.status || 500).json(
                await sails.helpers.response.errorResponse.with({
                    err:
                        err instanceof BaseError
                            ? err
                            : new ApplicationError(
                                  "Lỗi khi lấy danh sách roles",
                                  {
                                      raw: err,
                                  },
                              ),
                }),
            );
        }
    },

    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const role = await AdminRole.findOne({ id })
                .populate("permissions")
                .populate("users");

            if (!role) throw new NotFoundError("Không tìm thấy role");

            return res.ok(
                await sails.helpers.response.success.with({
                    data: {
                        ...formatRole(role),
                        permissions: groupPermissions(role.permissions),
                    },
                    message: "Lấy thông tin role thành công",
                }),
            );
        } catch (err) {
            sails.log.error("AdminRoleController.findOne - lỗi:", err);
            return res.status(err.status || 500).json(
                await sails.helpers.response.errorResponse.with({
                    err:
                        err instanceof BaseError
                            ? err
                            : new ApplicationError("Lỗi khi lấy role", {
                                  raw: err,
                              }),
                }),
            );
        }
    },

    create: async (req, res) => {
        try {
            const { name, description, permissions = {} } = req.body;
            if (!name) throw new ValidationError("Thiếu name cho role");

            const code = buildRoleCode(name);
            const exists = await AdminRole.findOne({ code });
            if (exists) throw new ConflictError("Role với code này đã tồn tại");

            const newRole = await AdminRole.create({
                name,
                code,
                description,
            }).fetch();

            if (Object.keys(permissions).length > 0) {
                const permissionIds = Object.values(permissions)
                    .flatMap((group) => Object.values(group))
                    .flat()
                    .map((p) => p.id);

                await AdminRole.addToCollection(
                    newRole.id,
                    "permissions",
                ).members(permissionIds);
            }

            return res.created(
                await sails.helpers.response.success.with({
                    data: formatRole(newRole),
                    message: "Tạo role mới thành công",
                }),
            );
        } catch (err) {
            sails.log.error("AdminRoleController.create - lỗi:", err);
            return res.status(err.status || 500).json(
                await sails.helpers.response.errorResponse.with({
                    err:
                        err instanceof BaseError
                            ? err
                            : new ApplicationError("Lỗi khi tạo role", {
                                  raw: err,
                              }),
                }),
            );
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, permissions } = req.body;
            if (!id) throw new ValidationError("Thiếu id role để cập nhật");

            const role = await AdminRole.findOne({ id });
            if (!role)
                throw new NotFoundError("Không tìm thấy role để cập nhật");

            const code = name ? buildRoleCode(name) : role.code;

            const updatedRole = await AdminRole.updateOne({ id }).set({
                name: name ?? role.name,
                code,
                description: description ?? role.description,
            });

            if (permissions && Object.keys(permissions).length > 0) {
                const permissionIds = Object.values(permissions)
                    .flatMap((group) => Object.values(group))
                    .flat()
                    .map((p) => p.id);

                await AdminRole.replaceCollection(
                    updatedRole.id,
                    "permissions",
                ).members(permissionIds);
            }

            const finalRole = await AdminRole.findOne({ id }).populate(
                "permissions",
            );

            return res.ok(
                await sails.helpers.response.success.with({
                    data: {
                        ...formatRole(finalRole),
                        permissions: finalRole.permissions,
                    },
                    message: "Cập nhật role thành công",
                }),
            );
        } catch (err) {
            sails.log.error("AdminRoleController.update - lỗi:", err);
            return res.status(err.status || 500).json(
                await sails.helpers.response.errorResponse.with({
                    err:
                        err instanceof BaseError
                            ? err
                            : new ApplicationError("Lỗi khi cập nhật role", {
                                  raw: err,
                              }),
                }),
            );
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) throw new ValidationError("Thiếu id role để xoá");

            const role = await AdminRole.findOne({ id }).populate("users");
            if (!role) throw new NotFoundError("Không tìm thấy role để xoá");

            if (role.users?.length > 0) {
                throw new ConflictError(
                    "Không thể xoá role vì vẫn còn người dùng được gán",
                );
            }

            await AdminRole.destroyOne({ id });

            return res.ok(
                await sails.helpers.response.success.with({
                    data: formatRole(role),
                    message: "Xoá role thành công",
                }),
            );
        } catch (err) {
            sails.log.error("AdminRoleController.destroy - lỗi:", err);
            return res.status(err.status || 500).json(
                await sails.helpers.response.errorResponse.with({
                    err:
                        err instanceof BaseError
                            ? err
                            : new ApplicationError("Lỗi khi xoá role", {
                                  raw: err,
                              }),
                }),
            );
        }
    },
};
