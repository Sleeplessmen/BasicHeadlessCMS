module.exports = async function seedPermissions() {
    const actions = [
        // AUTH
        {
            action: "auth.register",
            resource: "auth",
            description: "Register new user",
        },
        { action: "auth.login", resource: "auth", description: "Login user" },
        { action: "auth.logout", resource: "auth", description: "Logout user" },
        {
            action: "auth.forgotPassword",
            resource: "auth",
            description: "Forgot password",
        },
        {
            action: "auth.resetPassword",
            resource: "auth",
            description: "Reset password",
        },
        {
            action: "auth.changePassword",
            resource: "auth",
            description: "Change password",
        },
        {
            action: "auth.connect",
            resource: "auth",
            description: "Social connect",
        },
        {
            action: "auth.sendEmailConfirmation",
            resource: "auth",
            description: "Send email confirmation",
        },
        {
            action: "auth.emailConfirmation",
            resource: "auth",
            description: "Confirm email",
        },
        {
            action: "auth.me",
            resource: "auth",
            description: "Current user info",
        },

        // PERMISSIONS
        {
            action: "permissions.getPermissions",
            resource: "permissions",
            description: "Get permissions list",
        },

        // ROLES
        { action: "roles.find", resource: "roles", description: "List roles" },
        {
            action: "roles.findOne",
            resource: "roles",
            description: "Get one role",
        },
        {
            action: "roles.create",
            resource: "roles",
            description: "Create role",
        },
        {
            action: "roles.update",
            resource: "roles",
            description: "Update role",
        },
        {
            action: "roles.destroy",
            resource: "roles",
            description: "Delete role",
        },

        // USERS
        { action: "users.find", resource: "users", description: "List users" },
        {
            action: "users.findOne",
            resource: "users",
            description: "Get one user",
        },
        {
            action: "users.create",
            resource: "users",
            description: "Create user",
        },
        {
            action: "users.update",
            resource: "users",
            description: "Update user",
        },
        {
            action: "users.destroy",
            resource: "users",
            description: "Delete user",
        },
        {
            action: "users.count",
            resource: "users",
            description: "Count users",
        },
    ];

    for (const item of actions) {
        const exists = await Permission.findOne({ action: item.action });
        if (!exists) {
            await Permission.create(item);
        }
    }

    sails.log.info("✔ Default permissions seeded");
};
