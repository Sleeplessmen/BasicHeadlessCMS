module.exports = {
    attributes: {
        name: {
            type: "string",
            required: true,
        },

        parent: {
            model: "Folder",
        },

        assets: {
            collection: "Asset",
            via: "folder",
        },
    },
};
