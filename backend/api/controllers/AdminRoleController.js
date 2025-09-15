const {
    NotFoundError,
    ValidationError,
    ConflictError,
} = require("../../errors");

const buildRoleCode = (name) =>
    `strapi-${name.toLowerCase().replace(/\s+/g, "-")}`;

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

const formatRole = (role) => ({
    id: role.id,
    name: role.name,
    code: role.code,
    description: role.description,
    userCount: role.users?.length ?? 0,
});

module.exports = {
    // fixing
    find: async (req, res) => {
        const roles = await AdminRole.find()
            .populate("permissions")
            .populate("users");

        return res.ok(
            await sails.helpers.response.success.with({
                data: roles.map(formatRole),
                message: "Lấy danh sách roles thành công",
            }),
        );
    },

    // fixing
    findOne: async (req, res) => {
        const { id } = req.params;

        const role = await AdminRole.findOne({ id }).populate("users");
        if (!role) throw new NotFoundError("Không tìm thấy role");

        const usersCount = role.users ? role.users.length : 0;

        return res.ok(
            await sails.helpers.response.success.with({
                data: {
                    id: role.id,
                    name: role.name,
                    code: role.code,
                    description: role.description,
                    createdAt: role.createdAt,
                    updatedAt: role.updatedAt,
                    publishedAt: role.publishedAt,
                    usersCount,
                },
                message: "Lấy thông tin role thành công",
            }),
        );
    },

    // fixing
    create: async (req, res) => {
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
            await AdminRole.addToCollection(newRole.id, "permissions").members(
                permissionIds,
            );
        }

        return res.created(
            await sails.helpers.response.success.with({
                data: formatRole(newRole),
                message: "Tạo role mới thành công",
            }),
        );
    },

    // fixing
    update: async (req, res) => {
        const { id } = req.params;
        const { name, description, permissions } = req.body;
        if (!id) throw new ValidationError("Thiếu id role để cập nhật");

        const role = await AdminRole.findOne({ id });
        if (!role) throw new NotFoundError("Không tìm thấy role để cập nhật");

        if (role.code === "strapi-super-admin") {
            throw new ForbiddenError(
                "Không thể chỉnh sửa role strapi-super-admin",
            );
        }

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
    },

    // fixing
    destroy: async (req, res) => {
        const { id } = req.params;
        if (!id) throw new ValidationError("Thiếu id role để xoá");

        const role = await AdminRole.findOne({ id }).populate("users");
        if (!role) throw new NotFoundError("Không tìm thấy role để xoá");

        // Ngăn xóa role đặc biệt
        if (role.code === "strapi-super-admin") {
            throw new ForbiddenError("Không thể xoá role strapi-super-admin");
        }

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
    },

    // fixing
    getPermissions: async (req, res) => {
        const { id } = req.params;

        const role = await AdminRole.findOne({ id }).populate("permissions");
        if (!role) throw new NotFoundError("Không tìm thấy role");

        return res.ok(
            await sails.helpers.response.success.with({
                data: (role.permissions || []).map((p) => ({
                    id: p.id,
                    action: p.action,
                    actionParameters: p.actionParameters || {},
                    subject: p.subject,
                    properties: p.properties || {},
                    conditions: p.conditions || [],
                })),
                message: "Lấy danh sách quyền của role thành công",
            }),
        );
    },
};
