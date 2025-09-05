module.exports.routes = {
    /**
     * =============================
     * End User App Routes
     * =============================
     */

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
    "GET /api/v1/auth/me": {
        controller: "users-permissions/AuthController",
        action: "me",
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

    /**
     * =============================
     * Admin Panel App Routes
     * =============================
     */

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
    "GET /api/v1/admin/auth/me": {
        controller: "AdminAuthController",
        action: "me",
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

    // User routes
    "GET /api/v1/admin/users": {
        controller: "AdminUserController",
        action: "find",
        policies: ["isAdminAuthenticated", "isSuperAdmin"],
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
};
