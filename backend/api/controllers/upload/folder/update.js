module.exports = {
    friendlyName: "Find all assets",
    description: "Danh sách các media",

    inputs: {},

    exits: {
        success: {
            description: "List all of assets successfully",
            responseType: "success",
        },
    },

    fn: async function (input, exits) {
        return exits.success({
            message:
                "List all of assets successfully" || exits.success.description,
        });
    },
};
