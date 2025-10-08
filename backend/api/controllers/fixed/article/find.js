module.exports = {
    friendlyName: "Update Schema",
    description: "Tạo, cập nhật, hoặc xóa các components và content types",

    inputs: {
        components: { type: "ref", defaultsTo: [] },
        contentTypes: { type: "ref", defaultsTo: [] },
    },

    exits: {
        success: {
            description: "Schema updated",
            responseType: "success",
        },
    },

    fn: async function (inputs, exits) {
        return exits.success("Schema updated");
    },
};
