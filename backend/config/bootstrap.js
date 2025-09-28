require("dotenv").config({
    path: require("path").resolve(__dirname, "../.env"),
});

module.exports.bootstrap = async function () {
    sails.log("🔧 Bootstrap bắt đầu...");

    if (!sails._cleanupInterval) {
        sails._cleanupInterval = setInterval(
            async () => {
                const now = new Date();
                await sails.models.blacklisttoken.destroy({
                    expiresAt: { "<": now },
                });
            },
            1000 * 60 * 60,
        );
    }

    if (process.env.NODE_ENV === "development") {
        sails.log("🌱 Đang chạy seed dữ liệu...");
        await sails.helpers.seed.run();
        sails.log("✅ Seed hoàn tất!");
    }
};
