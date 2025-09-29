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

    "content-type-builder/schema": ["is-authenticated"],
    "content-type-builder/reserved-names": ["is-authenticated"],
    "content-type-builder/update-schema": ["is-authenticated"],
    "content-type-builder/component/get-components": ["is-authenticated"],
    "content-type-builder/component/get-component": ["is-authenticated"],
    "content-type-builder/content-type/get-content-types": ["is-authenticated"],
    "content-type-builder/content-type/get-content-type": ["is-authenticated"],

    "content-manager/init": ["is-authenticated"],
    "content-manager/find-content-types-settings": ["is-authenticated"],

    "content-manager/collection-type-entry/*": ["is-authenticated"],
    "content-manager/single-type-entry/*": ["is-authenticated"],
    "content-manager/entry-action/*": ["is-authenticated"],

    "content-manager/relation/*": ["is-authenticated"],

    "content-manager/preview/*": ["is-authenticated"],
};
