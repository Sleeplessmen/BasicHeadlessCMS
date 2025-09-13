module.exports.routes = {
    // Users-Permissions routes

    // Auth routes
    "POST /api/v1/auth/register": {
        controller: "users-permissions/AuthController",
        action: "register",
    },
    "POST /api/v1/auth/login": {
        controller: "users-permissions/AuthController",
        action: "login",
    },
    "POST /api/v1/auth/logout": {
        controller: "users-permissions/AuthController",
        action: "logout",
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
        controller: "AdminAuthController",
        action: "register",
    },
    "POST /api/v1/admin/auth/login": {
        controller: "AdminAuthController",
        action: "login",
    },
    "POST /api/v1/admin/auth/logout": {
        controller: "AdminAuthController",
        action: "logout",
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
        // policies: ["isAdminAuthenticated", "isSuperAdmin"],
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

    // Content Type Builder routes

    // content type routes
    "GET /api/v1/admin/content-type-builder/content-types": {
        controller: "content-type-builder/ContentTypeController",
        action: "getContentTypes",
    },
    "GET /api/v1/admin/content-type-builder/content-types/:uid": {
        controller: "content-type-builder/ContentTypeController",
        action: "getContentType",
    },

    // component routes
    "GET /api/v1/admin/content-type-builder/components": {
        controller: "content-type-builder/ComponentController",
        action: "getComponents",
    },
    "GET /api/v1/admin/content-type-builder/components/:uid": {
        controller: "content-type-builder/ComponentController",
        action: "getComponent",
    },

    // content type builder routes
    "GET /api/v1/admin/content-type-builder/schema": {
        controller: "content-type-builder/ContentTypeBuilderController",
        action: "getSchemas",
    },
    "GET /api/v1/admin/content-type-builder/reversed-name": {
        controller: "content-type-builder/ContentTypeBuilderController",
        action: "getReversedName",
    },

    // content type field routes
    "GET /api/v1/admin/content-type-builder/content-fields/:id": {
        controller: "content-type-builder/ContentTypeFieldController",
        action: "findOne",
    },
    "POST /api/v1/admin/content-type-builder/content-fields/:id": {
        controller: "content-type-builder/ContentTypeFieldController",
        action: "create",
    },
    "PUT /api/v1/admin/content-type-builder/content-fields/:id": {
        controller: "content-type-builder/ContentTypeFieldController",
        action: "update",
    },
    "DELETE /api/v1/admin/content-type-builder/content-fields/:id": {
        controller: "content-type-builder/ContentTypeFieldController",
        action: "destroy",
    },

    // component field routes
    "GET /api/v1/admin/content-type-builder/component-fields/:id": {
        controller: "content-type-builder/ComponentFieldController",
        action: "findOne",
    },
    "POST /api/v1/admin/content-type-builder/component-fields/:id": {
        controller: "content-type-builder/ComponentFieldController",
        action: "create",
    },
    "PUT /api/v1/admin/content-type-builder/component-fields/:id": {
        controller: "content-type-builder/ComponentFieldController",
        action: "update",
    },
    "DELETE /api/v1/admin/content-type-builder/component-fields/:id": {
        controller: "content-type-builder/ComponentFieldController",
        action: "destroy",
    },

    // Content Manager routes
    "GET /api/v1/admin/content-manager/init": {
        controller: "content-manager/ContentManagerController",
        action: "init",
    },
    "GET /api/v1/admin/content-manager/content-types-settings": {
        controller: "content-manager/ContentManagerController",
        action: "findContentTypesSettings",
    },

    // Single Type Entry routes
    "GET /api/v1/admin/content-manager/single-types/:uid": {
        controller: "content-manager/SingleTypeEntryController",
        action: "find",
    },
    "GET /api/v1/admin/content-manager/single-types/:uid": {
        controller: "content-manager/SingleTypeEntryController",
        action: "findOne",
    },
    "POST /api/v1/admin/content-manager/single-types/:uid": {
        controller: "content-manager/SingleTypeEntryController",
        action: "create",
    },
    "PUT /api/v1/admin/content-manager/single-types/:uid": {
        controller: "content-manager/SingleTypeEntryController",
        action: "update",
    },
    "DELETE /api/v1/admin/content-manager/single-types/:uid": {
        controller: "content-manager/SingleTypeEntryController",
        action: "destroy",
    },

    // Collection Type Entry routes
    "GET /api/v1/admin/content-manager/collection-types/:uid": {
        controller: "content-manager/CollectionTypeEntryController",
        action: "find",
    },
    "GET /api/v1/admin/content-manager/collection-types/:uid/:id": {
        controller: "content-manager/CollectionTypeEntryController",
        action: "findOne",
    },
    "POST /api/v1/admin/content-manager/collection-types/:uid": {
        controller: "content-manager/CollectionTypeEntryController",
        action: "create",
    },
    "PUT /api/v1/admin/content-manager/collection-types/:uid/:id": {
        controller: "content-manager/CollectionTypeEntryController",
        action: "update",
    },
    "DELETE /api/v1/admin/content-manager/collection-types/:uid/:id": {
        controller: "content-manager/CollectionTypeEntryController",
        action: "destroy",
    },

    // Relation routes
    "GET /api/v1/admin/content-manager/relations/:uid/categories": {
        controller: "content-manager/RelationController",
        action: "findAvailableRelations",
    },
    "GET /api/v1/admin/content-manager/relations/:uid/:id/categories": {
        controller: "content-manager/RelationController",
        action: "findExistingRelations",
    },

    // Preview routes
    "GET /api/v1/admin/content-manager/preview/url/:uid": {
        controller: "content-manager/PreviewController",
        action: "preview",
    },

    // Entry Action routes
    "POST /api/v1/admin/content-manager/:uid/:id/actions/publish": {
        controller: "content-manager/EntryActionController",
        action: "publish",
    },
    "POST /api/v1/admin/content-manager/:uid/:id/actions/unpublish": {
        controller: "content-manager/EntryActionController",
        action: "unpublish",
    },
    "POST /api/v1/admin/content-manager/:uid/:id/actions/discard": {
        controller: "content-manager/EntryActionController",
        action: "discardDraftChanges",
    },

    // Upload routes
    // Folder routes
    "GET /api/v1/admin/upload/folders": {
        controller: "upload/FolderController",
        action: "find",
    },
    "GET /api/v1/admin/upload/folders/:id": {
        controller: "upload/FolderController",
        action: "findOne",
    },
    "POST /api/v1/admin/upload/folders": {
        controller: "upload/FolderController",
        action: "create",
    },
    "PUT /api/v1/admin/upload/folders/:id": {
        controller: "upload/FolderController",
        action: "update",
    },
    "DELETE /api/v1/admin/upload/folders/:id": {
        controller: "upload/FolderController",
        action: "destroy",
    },
    "GET /api/v1/admin/upload/folder-structure": {
        controller: "upload/FolderController",
        action: "getFolderStructure",
    },

    // File routes
    "GET /api/v1/admin/upload/files": {
        controller: "upload/AssetController",
        action: "find",
    },
    "GET /api/v1/admin/upload/files/:id": {
        controller: "upload/AssetController",
        action: "findOne",
    },
    "POST /api/v1/admin/upload/": {
        controller: "upload/AssetController",
        action: "create",
    },
    "PUT /api/v1/admin/upload/:id": {
        controller: "upload/AssetController",
        action: "update",
    },
    "DELETE /api/v1/admin/upload/files/:id": {
        controller: "upload/AssetController",
        action: "destroy",
    },
    "GET /api/v1/admin/upload/configuration": {
        controller: "upload/AssetController",
        action: "getConfiguration",
    },
    "PUT /api/v1/admin/upload/configuration": {
        controller: "upload/AssetController",
        action: "updateConfiguration",
    },
};
