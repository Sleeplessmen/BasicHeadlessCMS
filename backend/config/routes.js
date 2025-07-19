module.exports.routes = {

    // Trang chủ (nếu có dùng view)
    '/': { view: 'pages/homepage' },

    // Auth API
    'POST /api/v1/auth/register': 'AuthController.register',
    'POST /api/v1/auth/login': 'AuthController.login',
    'POST /api/v1/auth/logout': 'AuthController.logout',
    'GET /api/v1/auth/me': 'AuthController.me',

    // Product API
    'GET    /api/v1/products': 'ProductController.findAll',
    'GET    /api/v1/products/:id': 'ProductController.findOne',
    'POST   /api/v1/products': 'ProductController.create',
    'PUT    /api/v1/products/:id': 'ProductController.update',
    'DELETE /api/v1/products/:id': 'ProductController.delete',

    // Page Config API
    'GET    /api/v1/page-config': 'PageConfigController.findAll',
    'GET    /api/v1/page-config/:slug': 'PageConfigController.findOne',
    'POST   /api/v1/page-config': 'PageConfigController.create',
    'PUT    /api/v1/page-config': 'PageConfigController.update',
    'DELETE /api/v1/page-config/:slug': 'PageConfigController.delete',
    'POST   /api/v1/page-config/publish': 'PageConfigController.publish',

    // Role API
    'GET    /api/v1/roles': 'RoleController.findAll',
    'GET    /api/v1/roles/:id': 'RoleController.findOne',
    'POST   /api/v1/roles': 'RoleController.create',
    'PUT    /api/v1/roles/:id': 'RoleController.update',
    'DELETE /api/v1/roles/:id': 'RoleController.delete',
    'PUT    /api/v1/roles/:id/permission': 'RoleController.assignPerm',

    // Permission API
    'GET    /api/v1/permissions': 'PermissionController.findAll',
    'GET    /api/v1/permissions/:id': 'PermissionController.findOne',
    'POST   /api/v1/permissions': 'PermissionController.create',
    'PUT    /api/v1/permissions/:id': 'PermissionController.update',
    'DELETE /api/v1/permissions/:id': 'PermissionController.delete',

    // User API
    'GET    /api/v1/users': 'AdminController.findAll',
    'GET    /api/v1/users/:id': 'AdminController.findOne',
    'POST   /api/v1/users': 'AdminController.create',
    'PUT    /api/v1/users/:id': 'AdminController.update',
    'DELETE /api/v1/users/:id': 'AdminController.delete',
    'PUT    /api/v1/users/:id/role': 'AdminController.assignRole',

};


