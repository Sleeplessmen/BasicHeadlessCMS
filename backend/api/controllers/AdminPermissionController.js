const { ApplicationError } = require("../../errors");

// Helper nhỏ để group permission theo prefix
function groupPermissions(permissions) {
    const result = {
        plugins: {},
        contentTypes: {},
        settings: {},
    };

    for (const { id, action, subject, description } of permissions) {
        if (!subject) continue;

        const [prefix, name] = subject.split("::");
        if (!name) continue;

        const entry = { id, action, subject, description };

        switch (prefix) {
            case "plugin":
                result.plugins[name] ??= [];
                result.plugins[name].push(entry);
                break;

            case "api":
                result.contentTypes[name] ??= [];
                result.contentTypes[name].push(entry);
                break;

            case "admin":
                result.settings[name] ??= [];
                result.settings[name].push(entry);
                break;

            default:
                sails.log.warn(
                    `Không nhận diện được prefix của subject: ${subject}`,
                );
        }
    }

    return result;
}

module.exports = {
    listAllPermissions: async function (req, res) {
        try {
            const permissions = await AdminPermission.find();
            const grouped = groupPermissions(permissions);

            return res.ok(
                await sails.helpers.response.success.with({
                    data: grouped,
                    message: "Lấy danh sách permissions thành công",
                    meta: {
                        total: permissions.length,
                        groupsCount: {
                            plugins: Object.keys(grouped.plugins).length,
                            contentTypes: Object.keys(grouped.contentTypes)
                                .length,
                            settings: Object.keys(grouped.settings).length,
                        },
                    },
                }),
            );
        } catch (err) {
            sails.log.error(
                "AdminPermissionController.listAllPermissions - lỗi:",
                err,
            );
            return res.status(err.status || 500).json(
                await sails.helpers.response.errorResponse.with({
                    err:
                        err instanceof BaseError
                            ? err
                            : new ApplicationError(
                                  "Lỗi khi lấy danh sách permissions",
                                  {
                                      raw: err,
                                  },
                              ),
                }),
            );
        }
    },
};
