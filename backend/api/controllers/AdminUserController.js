const {
    NotFoundError,
    BadRequestError,
    ApplicationError,
    BaseError,
} = require("../../errors");

// ----- Helper format user -----
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
    // ----- Lấy danh sách users -----
    find: async function (req, res) {
        try {
            let { page = 1, pageSize = 10, sort, filters } = req.query;

            page = Math.max(parseInt(page, 10) || 1, 1);
            pageSize = Math.max(parseInt(pageSize, 10) || 10, 1);

            // ----- Build where clause -----
            let where = {};
            if (filters?.$and) {
                const andClauses = [];
                for (const cond of Object.values(filters.$and)) {
                    const field = Object.keys(cond)[0];
                    const value = cond[field]?.$contains;
                    if (value)
                        andClauses.push({ [field]: { contains: value } });
                }
                if (andClauses.length > 0) where = { and: andClauses };
            }

            // ----- Build sort -----
            let sortClause;
            if (sort) {
                const [field, direction] = sort.split(":");
                if (field && direction)
                    sortClause = `${field} ${direction.toLowerCase()}`;
            }

            // ----- Query -----
            const total = await AdminUser.count(where);
            const users = await AdminUser.find(where)
                .sort(sortClause)
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .populate("roles");

            const formatted = users.map(formatUser);

            return res.ok(
                await sails.helpers.response.success.with({
                    data: formatted,
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
        } catch (err) {
            sails.log.error("AdminUserController.find - lỗi:", err);
            throw err instanceof BaseError
                ? err
                : new ApplicationError("Lỗi khi lấy danh sách users", {
                      raw: err,
                  });
        }
    },

    // ----- Lấy chi tiết 1 user -----
    findOne: async function (req, res) {
        try {
            const { id } = req.params;
            const user = await AdminUser.findOne({ id }).populate("roles");

            if (!user) throw new NotFoundError("Không tìm thấy user");

            return res.ok(
                await sails.helpers.response.success.with({
                    data: formatUser(user),
                    message: "Lấy thông tin user thành công",
                }),
            );
        } catch (err) {
            sails.log.error("AdminUserController.findOne - lỗi:", err);
            throw err instanceof BaseError
                ? err
                : new ApplicationError("Lỗi khi lấy user", { raw: err });
        }
    },

    // ----- Tạo user -----
    create: async function (req, res) {
        try {
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
                await AdminUser.addToCollection(newUser.id, "roles").members(
                    roles,
                );
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
        } catch (err) {
            sails.log.error("AdminUserController.create - lỗi:", err);
            throw err instanceof BaseError
                ? err
                : new ApplicationError("Lỗi khi tạo user", { raw: err });
        }
    },

    // ----- Cập nhật user -----
    update: async function (req, res) {
        try {
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

            const updatedUser = await AdminUser.findOne({ id }).populate(
                "roles",
            );

            return res.ok(
                await sails.helpers.response.success.with({
                    data: formatUser(updatedUser),
                    message: "Cập nhật user thành công",
                }),
            );
        } catch (err) {
            sails.log.error("AdminUserController.update - lỗi:", err);
            throw err instanceof BaseError
                ? err
                : new ApplicationError("Lỗi khi cập nhật user", { raw: err });
        }
    },

    // ----- Xoá user -----
    destroy: async function (req, res) {
        try {
            const { id } = req.params;
            if (!id) throw new BadRequestError("User id là bắt buộc");

            const deleted = await AdminUser.destroyOne({ id });
            if (!deleted) throw new NotFoundError("Không tìm thấy user");

            return res.ok(
                await sails.helpers.response.success.with({
                    data: formatUser(deleted),
                    message: "Xóa user thành công",
                }),
            );
        } catch (err) {
            sails.log.error("AdminUserController.destroy - lỗi:", err);
            throw err instanceof BaseError
                ? err
                : new ApplicationError("Lỗi khi xóa user", { raw: err });
        }
    },
};
