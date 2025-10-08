module.exports = {
    friendlyName: "Find an asset by id",
    description: "Danh sách các media",

    inputs: {},

    exits: {
        success: {
            description: "Find an asset by id successfully",
            responseType: "success",
        },
    },

    fn: async function (input, exits) {
        return exits.success({
            message: exits.success.description,
        });
    },
};
