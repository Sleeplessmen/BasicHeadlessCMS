const hasPermission = require('../policies/hasPermission');
const PERMISSIONS = require('../../constants/permissions');

module.exports = {
    // Auth
    authRegister: hasPermission(PERMISSIONS.AUTH_REGISTER),
    authLogin: hasPermission(PERMISSIONS.AUTH_LOGIN),
    authLogout: hasPermission(PERMISSIONS.AUTH_LOGOUT),

    // Product
    viewProduct: hasPermission(PERMISSIONS.VIEW_PRODUCT),
    createProduct: hasPermission(PERMISSIONS.CREATE_PRODUCT),
    updateProduct: hasPermission(PERMISSIONS.UPDATE_PRODUCT),
    deleteProduct: hasPermission(PERMISSIONS.DELETE_PRODUCT),

    // Page Config
    viewPageConfig: hasPermission(PERMISSIONS.VIEW_PAGE_CONFIG),
    createPageConfig: hasPermission(PERMISSIONS.CREATE_PAGE_CONFIG),
    updatePageConfig: hasPermission(PERMISSIONS.UPDATE_PAGE_CONFIG),
    deletePageConfig: hasPermission(PERMISSIONS.DELETE_PAGE_CONFIG),
    publishPage: hasPermission(PERMISSIONS.PUBLISH_PAGE),

    // Role
    viewRole: hasPermission(PERMISSIONS.VIEW_ROLE),
    createRole: hasPermission(PERMISSIONS.CREATE_ROLE),
    updateRole: hasPermission(PERMISSIONS.UPDATE_ROLE),
    deleteRole: hasPermission(PERMISSIONS.DELETE_ROLE),
    assignPermission: hasPermission(PERMISSIONS.ASSIGN_PERMISSION),

    // Permission
    viewPermission: hasPermission(PERMISSIONS.VIEW_PERMISSION),
    createPermission: hasPermission(PERMISSIONS.CREATE_PERMISSION),
    updatePermission: hasPermission(PERMISSIONS.UPDATE_PERMISSION),
    deletePermission: hasPermission(PERMISSIONS.DELETE_PERMISSION),

    // User
    viewUser: hasPermission(PERMISSIONS.VIEW_USER),
    createUser: hasPermission(PERMISSIONS.CREATE_USER),
    updateUser: hasPermission(PERMISSIONS.UPDATE_USER),
    deleteUser: hasPermission(PERMISSIONS.DELETE_USER),
    assignRole: hasPermission(PERMISSIONS.ASSIGN_ROLE),
};
