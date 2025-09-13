// fixing
module.exports.policies = {
    // cores
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

    // users-permissions
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

    // content-type-builder
    "content-type-builder/ContentTypeController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-type-builder/ContentTypeFieldController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-type-builder/ComponentController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-type-builder/ComponentFieldController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-type-builder/ContentTypeBuilderController": {
        "*": ["isAdminAuthenticated"],
    },

    // content-manager
    "content-manager/ContentManagerController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-manager/SingleTypeEntryController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-manager/CollectionTypeEntryController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-manager/RelationController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-manager/EntryActionController": {
        "*": ["isAdminAuthenticated"],
    },
    "content-manager/PreviewController": {
        "*": ["isAdminAuthenticated"],
    },

    // upload
    "upload/AssetController": {
        "*": ["isAdminAuthenticated"],
    },
    "upload/UploadController": {
        "*": ["isAdminAuthenticated"],
    },
};
