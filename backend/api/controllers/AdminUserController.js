const { NotFoundError, BadRequestError } = require("../../errors");

function formatUser(user) {
    if (!user) return null;
    return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        isActive: user.isActive,
        roles: (user.roles || []).map((r) => ({
            id: r.id,
            name: r.name,
        })),
    };
}

module.exports = {
    // fixing
    find: async (req, res) => {
        let { page = 1, pageSize = 10, sort, filters } = req.query;
        page = Math.max(parseInt(page, 10) || 1, 1);
        pageSize = Math.max(parseInt(pageSize, 10) || 10, 1);

        // ----- Build where clause -----
        let where = {};
        if (filters?.$and) {
            const andClauses = Object.values(filters.$and)
                .map((cond) => {
                    const field = Object.keys(cond)[0];
                    const value = cond[field]?.$contains;
                    if (value) return { [field]: { contains: value } };
                })
                .filter(Boolean);

            if (andClauses.length > 0) where = { and: andClauses };
        }

        // ----- Build sort -----
        let sortClause;
        if (sort) {
            const [field, direction] = sort.split(":");
            if (field && direction)
                sortClause = `${field} ${direction.toLowerCase()}`;
        }

        const total = await AdminUser.count(where);
        const users = await AdminUser.find(where)
            .sort(sortClause)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate("roles");

        return res.ok(
            await sails.helpers.response.success.with({
                data: formatUser(users),
                message: "Lấy danh sách users thành công",
                meta: {
                    pagination: {
                        page,
                        pageSize,
                        pageCount: Math.ceil(total / pageSize),
                        total,
                    },
                },
            }),
        );
    },

    // fixing
    findOne: async (req, res) => {
        const { id } = req.params;
        const user = await AdminUser.findOne({ id }).populate("roles");
        if (!user) throw new NotFoundError("Không tìm thấy user");

        return res.ok(
            await sails.helpers.response.success.with({
                data: formatUser(user),
                message: "Lấy thông tin user thành công",
            }),
        );
    },

    // fixing
    create: async (req, res) => {
        const { firstname, lastname, email, roles } = req.body;
        if (!firstname || !lastname || !email) {
            throw new BadRequestError(
                "firstname, lastname và email là bắt buộc",
            );
        }

        const newUser = await AdminUser.create({
            firstname,
            lastname,
            email,
        }).fetch();

        if (Array.isArray(roles) && roles.length > 0) {
            await AdminUser.addToCollection(newUser.id, "roles").members(roles);
        }

        const userWithRoles = await AdminUser.findOne({
            id: newUser.id,
        }).populate("roles");

        return res.created(
            await sails.helpers.response.success.with({
                data: formatUser(userWithRoles),
                message: "Tạo user thành công",
            }),
        );
    },

    // fixing
    update: async (req, res) => {
        const { id } = req.params;
        const { firstname, lastname, email, roles } = req.body;
        if (!id) throw new BadRequestError("User id là bắt buộc");

        const user = await AdminUser.updateOne({ id }).set({
            firstname,
            lastname,
            email,
        });
        if (!user) throw new NotFoundError("Không tìm thấy user");

        if (roles) {
            await AdminUser.replaceCollection(id, "roles").members(roles);
        }

        const updatedUser = await AdminUser.findOne({ id }).populate("roles");

        return res.ok(
            await sails.helpers.response.success.with({
                data: formatUser(updatedUser),
                message: "Cập nhật user thành công",
            }),
        );
    },

    // fixing
    destroy: async (req, res) => {
        const { id } = req.params;
        if (!id) throw new BadRequestError("User id là bắt buộc");

        const deletedUser = await AdminUser.destroyOne({ id });
        if (!deletedUser) throw new NotFoundError("Không tìm thấy user");

        return res.ok(
            await sails.helpers.response.success.with({
                data: formatUser(deletedUser),
                message: "Xóa user thành công",
            }),
        );
    },

    // fixing
    me: async (req, res) => {
        const user = req.user;
        if (!user)
            throw new BadRequestError("Thiếu thông tin user trong token");

        return res.ok(
            await sails.helpers.response.success.with({
                data: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    isActive: user.isActive,
                    blocked: user.blocked,
                    roles: (user.roles || []).map((r) => ({
                        id: r.id,
                        name: r.name,
                        description: r.description,
                        code: r.code,
                    })),
                },
                message: "Lấy thông tin user thành công",
            }),
        );
    },

    // fixing
    getUserPermissions: async (req, res) => {
        const user = req.user;
        if (!user)
            throw new BadRequestError("Thiếu thông tin user trong token");

        // Lấy tất cả quyền từ roles của user
        let permissions = [];
        for (const role of user.roles || []) {
            const roleWithPermissions = await AdminRole.findOne({
                id: role.id,
            }).populate("permissions");
            if (roleWithPermissions?.permissions) {
                permissions.push(...roleWithPermissions.permissions);
            }
        }

        // Loại bỏ trùng lặp theo id
        const uniquePermissions = _.uniqBy(permissions, "id");

        return res.ok(
            await sails.helpers.response.success.with({
                data: uniquePermissions.map((p) => ({
                    id: p.id,
                    action: p.action,
                    actionParameters: p.actionParameters || {},
                    subject: p.subject,
                    properties: p.properties || {},
                    conditions: p.conditions || [],
                })),
                message: "Lấy danh sách quyền thành công",
            }),
        );
    },
};
