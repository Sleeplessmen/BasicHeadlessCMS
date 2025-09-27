module.exports.policies = {
    // Cores
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

    "users-permissions/auth/logout": ["users-permissions/isAuthenticated"],

    "content-type-builder/schema": ["isAdminAuthenticated"],
    "content-type-builder/reserved-names": ["isAdminAuthenticated"],
    "content-type-builder/update-schema": ["isAdminAuthenticated"],
    "content-type-builder/component/get-components": ["isAdminAuthenticated"],
    "content-type-builder/component/get-component": ["isAdminAuthenticated"],
    "content-type-builder/content-type/get-content-types": [
        "isAdminAuthenticated",
    ],
    "content-type-builder/content-type/get-content-type": [
        "isAdminAuthenticated",
    ],

    "content-manager/init": ["isAdminAuthenticated"],
    "content-manager/find-content-types-settings": ["isAdminAuthenticated"],

    "content-manager/collection-type-entry/*": ["isAdminAuthenticated"],
    "content-manager/single-type-entry/*": ["isAdminAuthenticated"],
    "content-manager/entry-action/*": ["isAdminAuthenticated"],

    "content-manager/relation/*": ["isAdminAuthenticated"],

    "content-manager/preview/*": ["isAdminAuthenticated"],
};
