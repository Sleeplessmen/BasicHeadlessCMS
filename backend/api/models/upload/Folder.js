module.exports = {
    attributes: {
        name: {
            type: "string",
            required: true,
        },

        parent: {
            model: "Folder",
            allowNull: true,
        },

        assets: {
            collection: "Asset",
            via: "folder",
        },
    },
};
