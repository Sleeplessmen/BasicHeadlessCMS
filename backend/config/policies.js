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

    AuthController: {
        register: true,
        login: true,
        // logout: ["isAuthenticated"],
        // forgotPassword: true,
        // resetPassword: true,
        // changePassword: ["isAuthenticated"],
        // connect: true,
        // sendEmailConfirmation: true,
        // emailConfirmation: true,
        // me: ["isAuthenticated"],
    },

    PermissionController: {
        getPermissions: ["isAdminAuthenticated"],
    },

    RoleController: {
        "*": ["isAdminAuthenticated"],
    },

    UserController: {
        "*": true,
        // me: ["isAuthenticated"],
        // update: ["isAuthenticated", "isOwner"],
    },
};
