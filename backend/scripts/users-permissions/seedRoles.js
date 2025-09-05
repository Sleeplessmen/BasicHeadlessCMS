module.exports = async function seedRoles() {
    const defaultRoles = [
        {
            name: "Super Admin",
            description: "Full access",
            type: "authenticated",
        },
        {
            name: "Authenticated",
            description: "Logged in users",
            type: "authenticated",
        },
        {
            name: "Public",
            description: "Unauthenticated users",
            type: "public",
        },
    ];

    const roles = {};
    for (const role of defaultRoles) {
        roles[role.name] = await Role.findOrCreate({ name: role.name }, role);
    }

    const allPermissions = await Permission.find();
    sails.log.debug(`🔑 Loaded ${allPermissions.length} permissions`);

    await Role.replaceCollection(
        roles["Super Admin"].id,
        "permissions",
    ).members(allPermissions.map((p) => p.id));

    const authPerms = await Permission.find({
        action: { in: ["auth.changePassword", "auth.me"] },
    });
    sails.log.debug(
        `🔑 Authenticated role perms: ${authPerms.map((p) => p.action).join(", ")}`,
    );

    await Role.replaceCollection(
        roles["Authenticated"].id,
        "permissions",
    ).members(authPerms.map((p) => p.id));

    const publicPermsRaw = await Permission.find({
        where: {
            action: { startsWith: "auth." },
        },
    });

    const publicPerms = publicPermsRaw.filter(
        (p) => p.action !== "auth.changePassword",
    );

    sails.log.debug(
        `🔑 Public role perms: ${publicPerms.map((p) => p.action).join(", ")}`,
    );

    await Role.replaceCollection(roles["Public"].id, "permissions").members(
        publicPerms.map((p) => p.id),
    );

    sails.log.info("✔ Default roles & permissions seeded successfully");
};
