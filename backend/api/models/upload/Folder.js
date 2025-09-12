module.exports = {
    attributes: {
        name: {
            type: "string",
            required: true,
        },

        path: {
            type: "string",
            required: true,
        },

        pathId: {
            type: "number",
            required: true,
        },

        parent: {
            model: "Folder",
        },

        children: {
            collection: "Folder",
            via: "parent",
        },

        assets: {
            collection: "Asset",
            via: "folder",
        },

        createdAt: {
            type: "ref",
            columnType: "datetime",
            autoCreatedAt: true,
        },

        updatedAt: {
            type: "ref",
            columnType: "datetime",
            autoUpdatedAt: true,
        },

        publishedAt: {
            type: "ref",
            columnType: "datetime",
        },

        locale: {
            type: "string",
            allowNull: true,
        },
    },
};
