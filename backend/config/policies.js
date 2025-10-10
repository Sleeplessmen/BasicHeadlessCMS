module.exports.policies = {
    AdminUserController: {
        "*": ["is-authenticated"],
    },

    AdminPermissionController: {
        "*": ["is-authenticated"],
    },

    AdminRoleController: {
        "*": ["is-authenticated"],
    },

    "core/auth/logout": ["is-authenticated"],
    "core/auth/renew-token": ["is-refresh-authenticated"],

    "users-permissions/auth/logout": ["users-permissions/is-authenticated"],

    "content-type-builder/reserved-names": ["is-authenticated"],
    "content-type-builder/component/*": ["is-authenticated"],
    "content-type-builder/content-type/*": ["is-authenticated"],

    "content-manager/*": ["is-authenticated"],

    // "content-manager/collection-type-entry/*": ["is-authenticated"],
    // "content-manager/single-type-entry/*": ["is-authenticated"],
    // "content-manager/entry-action/*": ["is-authenticated"],
    // "content-manager/relation/*": ["is-authenticated"],
    // "content-manager/preview/*": ["is-authenticated"],

    "upload/asset/*": true,
    "upload/folder/*": true,
};
