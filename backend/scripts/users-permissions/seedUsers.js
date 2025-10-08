const bcrypt = require("bcryptjs");

module.exports = async function seedUsers() {
    const adminEmail = "admin@example.com";
    const adminPassword = "Admin123!";

    // Super Admin
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
        const hash = await bcrypt.hash(adminPassword, 10);
        const superAdminRole = await Role.findOne({ name: "Super Admin" });

        admin = await User.create({
            username: "admin",
            email: adminEmail,
            password: hash,
            confirmed: true,
            blocked: false,
            role: superAdminRole.id,
        }).fetch();

        sails.log.info(`Admin user created: ${adminEmail} / ${adminPassword}`);
    }

    // 5 Authenticated users
    const authRole = await Role.findOne({ name: "Authenticated" });
    for (let i = 1; i <= 5; i++) {
        const email = `auth${i}@example.com`;
        const exists = await User.findOne({ email });
        if (!exists) {
            await User.create({
                username: `auth_user_${i}`,
                email,
                password: await bcrypt.hash("Password123!", 10),
                confirmed: true,
                blocked: false,
                role: authRole.id,
            });
        }
    }

    // 5 Public users
    const publicRole = await Role.findOne({ name: "Public" });
    for (let i = 1; i <= 5; i++) {
        const email = `public${i}@example.com`;
        const exists = await User.findOne({ email });
        if (!exists) {
            await User.create({
                username: `public_user_${i}`,
                email,
                password: await bcrypt.hash("Password123!", 10),
                confirmed: false,
                blocked: false,
                role: publicRole.id,
            });
        }
    }

    sails.log.info("Default users (admin + 5 authenticated + 5 public) seeded");
};
