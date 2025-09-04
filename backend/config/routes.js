module.exports.routes = {
    // Auth routes
    "POST /api/v1/auth/register": {
        controller: "AdminAuthController",
        action: "register",
    },
    "POST /api/v1/auth/login": {
        controller: "AdminAuthController",
        action: "login",
    },
    "POST /api/v1/auth/logout": {
        controller: "AdminAuthController",
        action: "logout",
    },
    "GET /api/v1/auth/me": {
        controller: "AdminAuthController",
        action: "me",
    },

    // Permission routes
    "GET /api/v1/permissions": {
        controller: "AdminPermissionController",
        action: "listAllPermissions",
    },

    // Role routes
    "GET /api/v1/roles": {
        controller: "AdminRoleController",
        action: "find",
    },
    "GET /api/v1/roles/:id": {
        controller: "AdminRoleController",
        action: "findOne",
    },
    "POST /api/v1/roles": {
        controller: "AdminRoleController",
        action: "create",
    },
    "PUT /api/v1/roles/:id": {
        controller: "AdminRoleController",
        action: "update",
    },
    "DELETE /api/v1/roles/:id": {
        controller: "AdminRoleController",
        action: "destroy",
    },

    // User routes
    "GET /api/v1/users": {
        controller: "AdminUserController",
        action: "find",
        policies: ["isAdminAuthenticated", "isSuperAdmin"],
    },
    "GET /api/v1/users/:id": {
        controller: "AdminUserController",
        action: "findOne",
    },
    "POST /api/v1/users": {
        controller: "AdminUserController",
        action: "create",
    },
    "PUT /api/v1/users/:id": {
        controller: "AdminUserController",
        action: "update",
    },
    "DELETE /api/v1/users/:id": {
        controller: "AdminUserController",
        action: "destroy",
    },
};
