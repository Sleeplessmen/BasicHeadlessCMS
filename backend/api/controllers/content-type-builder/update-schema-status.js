module.exports = {
    friendlyName: "Update Schema Status",
    description: "Cập nhật trạng thái schema (stub)",

    fn: async function (inputs, exits) {
        return exits.success({
            message: "ContentTypeController.updateSchemaStatus",
        });
    },
};
