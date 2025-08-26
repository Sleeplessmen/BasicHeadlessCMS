process.chdir(__dirname);

// require("dotenv").config({
//     path: require("path").resolve(__dirname, "../.env"),
// });

const sails = require("sails");
const rc = require("sails/accessible/rc");

(async () => {
    try {
        await sails.lift(rc("sails"));
        console.log("Sails app started successfully");
    } catch (err) {
        console.error(
            "Không thể khởi chạy ứng dụng. Vui lòng chạy `npm install` nếu thiếu Sails.js."
        );
        console.error("Chi tiết lỗi:\n", err);
        process.exit(1);
    }
})();

process.on("SIGINT", async () => {
    console.log("Đang tắt ứng dụng...");
    await sails.lower(); // đóng kết nối DB, server, cleanup
    process.exit();
});
