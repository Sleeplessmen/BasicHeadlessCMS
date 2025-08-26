module.exports.policies = {
    AuthController: {
        "*": true,
        me: "isLoggedIn",
    },

    // ProductController: {
    //     findAll: withAuth(has.viewProduct),
    //     findOne: withAuth(has.viewProduct),
    //     create: withAuth(has.createProduct),
    //     update: withAuth(has.updateProduct),
    //     delete: withAuth(has.deleteProduct),
    // },

    // RoleController: {
    //     findAll: withAuth(has.viewRole),
    //     findOne: withAuth(has.viewRole),
    //     create: withAuth(has.createRole),
    //     update: withAuth(has.updateRole),
    //     delete: withAuth(has.deleteRole),
    //     assignPerm: withAuth(has.assignPermission),
    // },

    // PermissionController: {
    //     findAll: withAuth(has.viewPermission),
    //     findOne: withAuth(has.viewPermission),
    //     create: withAuth(has.createPermission),
    //     update: withAuth(has.updatePermission),
    //     delete: withAuth(has.deletePermission),
    // },

    // AdminController: {
    //     findAll: withAuth(has.viewUser),
    //     findOne: withAuth(has.viewUser),
    //     create: withAuth(has.createUser),
    //     update: withAuth(has.updateUser),
    //     delete: withAuth(has.deleteUser),
    //     assignRole: withAuth(has.assignRole),
    // },
};
