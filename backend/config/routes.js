module.exports.routes = {
    // fixed: content = article

    "GET /api/v1/articles": {
        action: "fixed/article/find",
    },

    "GET /api/v1/articles/:id": {
        action: "fixed/article/find-one",
    },

    "POST /api/v1/articles": {
        action: "fixed/article/create",
    },

    "PUT /api/v1/articles/:id": {
        action: "fixed/article/update",
    },

    "DELETE /api/v1/articles/:id": {
        action: "fixed/article/destroy",
    },

    "POST /api/v1/articles/:id/publish": {
        action: "fixed/article/publish",
    },

    "POST /api/v1/articles/:id/unpublish": {
        action: "fixed/article/unpublish",
    },

    // Users-Permissions routes

    // Auth routes
    "POST /api/v1/auth/register": {
        action: "users-permissions/auth/register",
    },
    "POST /api/v1/auth/login": {
        action: "users-permissions/auth/login",
    },
    "POST /api/v1/auth/logout": {
        action: "users-permissions/auth/logout",
    },

    "POST /api/v1/auth/forgot-password": {
        controller: "users-permissions/AuthController",
        action: "forgotPassword",
    },
    "POST /api/v1/auth/reset-password": {
        controller: "users-permissions/AuthController",
        action: "resetPassword",
    },
    "POST /api/v1/auth/change-password": {
        controller: "users-permissions/AuthController",
        action: "changePassword",
    },
    "POST /api/v1/auth/connect": {
        controller: "users-permissions/AuthController",
        action: "connect",
    },
    "POST /api/v1/auth/send-email-confirmation": {
        controller: "users-permissions/AuthController",
        action: "sendEmailConfirmation",
    },
    "GET /api/v1/auth/email-confirmation": {
        controller: "users-permissions/AuthController",
        action: "emailConfirmation",
    },

    // Permission routes
    "GET /api/v1/permissions": {
        controller: "users-permissions/PermissionController",
        action: "getPermissions",
    },

    // Role routes
    "GET /api/v1/roles": {
        controller: "users-permissions/RoleController",
        action: "find",
    },
    "GET /api/v1/roles/:id": {
        controller: "users-permissions/RoleController",
        action: "findOne",
    },
    "POST /api/v1/roles": {
        controller: "users-permissions/RoleController",
        action: "create",
    },
    "PUT /api/v1/roles/:id": {
        controller: "users-permissions/RoleController",
        action: "update",
    },
    "DELETE /api/v1/roles/:id": {
        controller: "users-permissions/RoleController",
        action: "destroy",
    },

    // User routes
    "GET /api/v1/users": {
        controller: "users-permissions/UserController",
        action: "find",
    },
    "GET /api/v1/users/count": {
        controller: "users-permissions/UserController",
        action: "count",
    },
    "GET /api/v1/users/:id": {
        controller: "users-permissions/UserController",
        action: "findOne",
    },
    "POST /api/v1/users": {
        controller: "users-permissions/UserController",
        action: "create",
    },
    "PUT /api/v1/users/:id": {
        controller: "users-permissions/UserController",
        action: "update",
    },
    "DELETE /api/v1/users/:id": {
        controller: "users-permissions/UserController",
        action: "destroy",
    },

    // Core routes

    // Auth routes
    "POST /api/v1/admin/auth/register": {
        action: "core/auth/register",
    },
    "POST /api/v1/admin/auth/login": {
        action: "core/auth/login",
    },
    "POST /api/v1/admin/auth/logout": {
        action: "core/auth/logout",
    },
    "POST /api/v1/admin/renew-token": {
        action: "core/auth/renew-token",
    },

    // Permission routes
    "GET /api/v1/admin/permissions": {
        controller: "AdminPermissionController",
        action: "getAdminPermissions",
    },

    // Role routes
    "GET /api/v1/admin/roles": {
        controller: "AdminRoleController",
        action: "find",
    },
    "GET /api/v1/admin/roles/:id": {
        controller: "AdminRoleController",
        action: "findOne",
    },
    "POST /api/v1/admin/roles": {
        controller: "AdminRoleController",
        action: "create",
    },
    "PUT /api/v1/admin/roles/:id": {
        controller: "AdminRoleController",
        action: "update",
    },
    "DELETE /api/v1/admin/roles/:id": {
        controller: "AdminRoleController",
        action: "destroy",
    },
    "GET /api/v1/admin/roles/:id/permissions": {
        controller: "AdminRoleController",
        action: "getPermissions",
    },

    // User routes
    "GET /api/v1/admin/users": {
        controller: "AdminUserController",
        action: "find",
        // policies: ["is-authenticated", "isSuperAdmin"],
    },
    "GET /api/v1/admin/users/:id": {
        controller: "AdminUserController",
        action: "findOne",
    },
    "POST /api/v1/admin/users": {
        controller: "AdminUserController",
        action: "create",
    },
    "PUT /api/v1/admin/users/:id": {
        controller: "AdminUserController",
        action: "update",
    },
    "DELETE /api/v1/admin/users/:id": {
        controller: "AdminUserController",
        action: "destroy",
    },
    "GET /api/v1/admin/users/me": {
        controller: "AdminUserController",
        action: "me",
    },
    "GET /api/v1/admin/users/me/permissions": {
        controller: "AdminUserController",
        action: "getUserPermissions",
    },

    // Content Type Builder
    "GET /api/v1/admin/content-type-builder/schema": {
        action: "content-type-builder/schema",
    },
    "GET /api/v1/admin/content-type-builder/reserved-names": {
        action: "content-type-builder/reserved-names",
    },
    "POST /api/v1/admin/content-type-builder/update-schema": {
        action: "content-type-builder/update-schema",
    },

    // Component routes
    "GET /api/v1/admin/content-type-builder/components": {
        action: "content-type-builder/component/get-components",
    },
    "GET /api/v1/admin/content-type-builder/components/:uid": {
        action: "content-type-builder/component/get-component",
    },

    // Content Type routes
    "GET /api/v1/admin/content-type-builder/content-types": {
        action: "content-type-builder/content-type/get-content-types",
    },
    "GET /api/v1/admin/content-type-builder/content-types/:uid": {
        action: "content-type-builder/content-type/get-content-type",
    },

    // Content Manager
    "GET /api/v1/admin/content-manager/init": {
        action: "content-manager/init",
    },
    "GET /api/v1/admin/content-manager/content-types-settings": {
        action: "content-manager/find-content-types-settings",
    },

    // Single Type Entry
    "GET /api/v1/admin/content-manager/single-types/:uid": {
        action: "content-manager/single-type-entry/find",
    },
    "GET /api/v1/admin/content-manager/single-types/:uid/one": {
        action: "content-manager/single-type-entry/find-one",
    },
    "POST /api/v1/admin/content-manager/single-types/:uid": {
        action: "content-manager/single-type-entry/create",
    },
    "PUT /api/v1/admin/content-manager/single-types/:uid": {
        action: "content-manager/single-type-entry/update",
    },
    "DELETE /api/v1/admin/content-manager/single-types/:uid": {
        action: "content-manager/single-type-entry/destroy",
    },

    // Collection Type Entry
    "GET /api/v1/admin/content-manager/collection-types/:uid": {
        action: "content-manager/collection-type-entry/find",
    },
    "GET /api/v1/admin/content-manager/collection-types/:uid/:id": {
        action: "content-manager/collection-type-entry/find-one",
    },
    "POST /api/v1/admin/content-manager/collection-types/:uid": {
        action: "content-manager/collection-type-entry/create",
    },
    "PUT /api/v1/admin/content-manager/collection-types/:uid/:id": {
        action: "content-manager/collection-type-entry/update",
    },
    "DELETE /api/v1/admin/content-manager/collection-types/:uid/:id": {
        action: "content-manager/collection-type-entry/destroy",
    },

    // Relation
    "GET /api/v1/admin/content-manager/relations/:uid/categories": {
        action: "content-manager/relation/find-available-relations",
    },
    "GET /api/v1/admin/content-manager/relations/:uid/:id/categories": {
        action: "content-manager/relation/find-existing-relations",
    },

    // Preview
    "GET /api/v1/admin/content-manager/preview/url/:uid": {
        action: "content-manager/preview/preview",
    },

    // Entry Actions
    "POST /api/v1/admin/content-manager/:uid/:id/actions/publish": {
        action: "content-manager/entry-action/publish",
    },
    "POST /api/v1/admin/content-manager/:uid/:id/actions/unpublish": {
        action: "content-manager/entry-action/unpublish",
    },
    "POST /api/v1/admin/content-manager/:uid/:id/actions/discard": {
        action: "content-manager/entry-action/discard-draft-changes",
    },

    // // Upload routes

    // // Folder routes
    // "GET /api/v1/admin/upload/folders": {
    //     controller: "upload/FolderController",
    //     action: "find",
    // },
    // "GET /api/v1/admin/upload/folders/:id": {
    //     controller: "upload/FolderController",
    //     action: "findOne",
    // },
    // "POST /api/v1/admin/upload/folders": {
    //     controller: "upload/FolderController",
    //     action: "create",
    // },
    // "PUT /api/v1/admin/upload/folders/:id": {
    //     controller: "upload/FolderController",
    //     action: "update",
    // },
    // "DELETE /api/v1/admin/upload/folders/:id": {
    //     controller: "upload/FolderController",
    //     action: "destroy",
    // },
    // "GET /api/v1/admin/upload/folder-structure": {
    //     controller: "upload/FolderController",
    //     action: "getFolderStructure",
    // },

    // // File routes
    // "GET /api/v1/admin/upload/files": {
    //     controller: "upload/AssetController",
    //     action: "find",
    // },
    // "GET /api/v1/admin/upload/files/:id": {
    //     controller: "upload/AssetController",
    //     action: "findOne",
    // },
    // "POST /api/v1/admin/upload/": {
    //     controller: "upload/AssetController",
    //     action: "create",
    // },
    // "PUT /api/v1/admin/upload/:id": {
    //     controller: "upload/AssetController",
    //     action: "update",
    // },
    // "DELETE /api/v1/admin/upload/files/:id": {
    //     controller: "upload/AssetController",
    //     action: "destroy",
    // },
    // "GET /api/v1/admin/upload/configuration": {
    //     controller: "upload/AssetController",
    //     action: "getConfiguration",
    // },
    // "PUT /api/v1/admin/upload/configuration": {
    //     controller: "upload/AssetController",
    //     action: "updateConfiguration",
    // },
};
