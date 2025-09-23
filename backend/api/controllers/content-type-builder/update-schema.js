const path = require("node:path");

module.exports = {
    friendlyName: "Update Schema",
    description: "Tạo, cập nhật, hoặc xóa các components và content types",

    inputs: {
        components: { type: "ref", defaultsTo: [] },
        contentTypes: { type: "ref", defaultsTo: [] },
    },

    fn: async function (inputs) {
        return this.res.success({ success: true }, "Schema updated");
    },
};
