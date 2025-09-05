require("dotenv").config({
    path: require("path").resolve(__dirname, "../.env"),
});

module.exports.bootstrap = async function (done) {
    // Mỗi 1 giờ dọn dẹp token hết hạn
    setInterval(
        async () => {
            const now = new Date();
            await BlacklistToken.destroy({ expiredAt: { "<": now } });
        },
        1000 * 60 * 60,
    );

    try {
        if (process.env.NODE_ENV === "development") {
            await require("../scripts/cores/seedAdminPermissions")();
            await require("../scripts/cores/seedAdminRoles")();
            await require("../scripts/cores/seedAdminUsers")();
            await require("../scripts/users-permissions/seedPermissions")();
            await require("../scripts/users-permissions/seedRoles")();
            await require("../scripts/users-permissions/seedUsers")();
        }

        return done();
    } catch (err) {
        sails.log.error("Bootstrap error:", err.stack || err.message);
        return done(err);
    }
};
