module.exports = {
    attributes: {
        name: {
            type: "string",
            required: true,
        },

        parent: {
            model: "Folder",
        }, // hỗ trợ folder lồng nhau

        assets: {
            collection: "Asset",
            via: "folder",
        },
    },
};
