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
    // Content Type Builder
    "content-type-builder/schema": ["isAdminAuthenticated"],
    "content-type-builder/reversed-names": ["isAdminAuthenticated"],
    "content-type-builder/update-schema": ["isAdminAuthenticated"],
    "content-type-builder/update-schema-status": ["isAdminAuthenticated"],
    "content-type-builder/component/get-components": ["isAdminAuthenticated"],
    "content-type-builder/component/get-component": ["isAdminAuthenticated"],
    "content-type-builder/content-type/get-content-types": [
        "isAdminAuthenticated",
    ],
    "content-type-builder/content-type/get-content-type": [
        "isAdminAuthenticated",
    ],

    // Content Manager
    "content-manager/init": ["isAdminAuthenticated"],
    "content-manager/find-content-types-settings": ["isAdminAuthenticated"],

    "content-manager/collection-type-entry/*": ["isAdminAuthenticated"],
    "content-manager/single-type-entry/*": ["isAdminAuthenticated"],
    "content-manager/entry-action/*": ["isAdminAuthenticated"],

    // Relation
    "content-manager/relation/find-available-relations": [
        "isAdminAuthenticated",
    ],
    "content-manager/relation/find-existing-relations": [
        "isAdminAuthenticated",
    ],

    // Preview
    "content-manager/preview/preview": ["isAdminAuthenticated"],
};
