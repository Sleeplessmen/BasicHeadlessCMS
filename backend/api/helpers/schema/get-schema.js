const path = require("path");
module.exports = {
    friendlyName: "Get schema by collection name",
    description: "Load schema file từ content-types",

    inputs: { collection: { type: "string", required: true } },

    fn: async function (inputs) {
        try {
            const schemaPath = path.join(
                __dirname,
                `../../content-types/${inputs.collection}.js`,
            );
            return require(schemaPath);
        } catch (err) {
            return null;
        }
    },
};
