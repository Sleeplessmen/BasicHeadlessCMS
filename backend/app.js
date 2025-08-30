process.chdir(__dirname);

const sails = require("sails");
const rc = require("sails/accessible/rc");

require("module-alias/register");

(async () => {
    try {
        await sails.lift(rc("sails"));
        console.log("Sails app started successfully");
    } catch (err) {
        console.error("Không thể khởi chạy ứng dụng:", err);
        process.exit(1);
    }
})();

process.on("SIGINT", async () => {
    console.log("Đang tắt ứng dụng...");
    await sails.lower();
    process.exit();
});
