module.exports.routes = {
    // // Trang chủ (nếu có dùng view)
    // '/': { view: 'pages/homepage' },

    // Auth API
    "POST /api/v1/auth/register": "AuthController.register",
    "POST /api/v1/auth/login": "AuthController.login",
    "POST /api/v1/auth/logout": "AuthController.logout",
    "GET /api/v1/auth/me": "AuthController.me",

    // Role API
    "GET    /api/v1/roles": "RoleController.findAll",
    "GET    /api/v1/roles/:id": "RoleController.findOne",
    "POST   /api/v1/roles": "RoleController.create",
    "PUT    /api/v1/roles/:id": "RoleController.update",
    "DELETE /api/v1/roles/:id": "RoleController.delete",
    "PUT    /api/v1/roles/:id/permission": "RoleController.assignPerm",

    // Permission API
    "GET    /api/v1/permissions": "PermissionController.findAll",
    "GET    /api/v1/permissions/:id": "PermissionController.findOne",
    "POST   /api/v1/permissions": "PermissionController.create",
    "PUT    /api/v1/permissions/:id": "PermissionController.update",
    "DELETE /api/v1/permissions/:id": "PermissionController.delete",
};
