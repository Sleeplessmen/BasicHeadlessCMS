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

    "users-permissions/AuthController": {
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

    "users-permissions/PermissionController": {
        getPermissions: ["isAdminAuthenticated"],
    },

    "users-permissions/RoleController": {
        "*": ["isAdminAuthenticated"],
    },

    "users-permissions/UserController": {
        "*": true,
        // me: ["isAuthenticated"],
        // update: ["isAuthenticated", "isOwner"],
    },
};
