const has = require('../api/permissions/hasPermissionPolicies');

module.exports.policies = {
    AuthController: {
        '*': true
    },

    ProductController: {
        '*': ['isLoggedIn'],
        findAll: has.viewProduct,
        findOne: has.viewProduct,
        create: has.createProduct,
        update: has.updateProduct,
        delete: has.deleteProduct,
    },

    PageConfigController: {
        '*': ['isLoggedIn'],
        findAll: has.viewPageConfig,
        findOne: has.viewPageConfig,
        create: has.createPageConfig,
        update: has.updatePageConfig,
        delete: has.deletePageConfig,
        publish: has.publishPage,
    },

    RoleController: {
        '*': ['isLoggedIn'],
        findAll: has.viewRole,
        findOne: has.viewRole,
        create: has.createRole,
        update: has.updateRole,
        delete: has.deleteRole,
        assignPerm: has.assignPermission,
    },

    PermissionController: {
        '*': ['isLoggedIn'],
        findAll: has.viewPermission,
        findOne: has.viewPermission,
        create: has.createPermission,
        update: has.updatePermission,
        delete: has.deletePermission,
    },

    UserController: {
        '*': ['isLoggedIn'],
        findAll: has.viewUser,
        findOne: has.viewUser,
        create: has.createUser,
        update: has.updateUser,
        delete: has.deleteUser,
        assignRole: has.assignRole,
    },
};
