module.exports.policies = {
    AdminAuthController: {
        register: true,
        login: true,
        logout: ["isAdminAuthenticated"],
        me: ["isAdminAuthenticated"],
    },

    AdminUserController: {
        "*": ["isAdminAuthenticated"],
    },

    AdminPermissionController: {
        "*": ["isAdminAuthenticated"],
    },

    AdminRoleController: {
        "*": ["isAdminAuthenticated"],
    },
};
