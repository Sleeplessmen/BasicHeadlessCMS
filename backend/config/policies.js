// fixing
module.exports.policies = {
    AdminAuthController: {
        register: true,
        login: true,
        logout: ["isAdminAuthenticated"],
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
        "*": true,
        // register: true,
        // login: true,
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
        "*": ["isAdminAuthenticated"],
    },

    "users-permissions/RoleController": {
        "*": ["isAdminAuthenticated"],
    },

    "users-permissions/UserController": {
        "*": true,
        // me: ["isAuthenticated"],
        // update: ["isAuthenticated", "isOwner"],
    },

    "content-type-builder/ContentTypeController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-type-builder/ContentFieldController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-type-builder/ComponentController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-type-builder/ComponentFieldController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-type-builder/SchemaController": {
        "*": ["isAdminAuthenticated"],
    },
    // "content-manager/EntryController": {
    //     "*": ["isAdminAuthenticated"],
    // },
    // "content-manager/RelationController": {
    //     "*": ["isAdminAuthenticated"],
    // },
    // "upload/FileController": {
    //     "*": ["isAdminAuthenticated"],
    // },
    // "upload/UploadController": {
    //     "*": ["isAdminAuthenticated"],
    // },
};
