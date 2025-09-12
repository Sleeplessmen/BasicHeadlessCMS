module.exports = {
    attributes: {
        name: {
            type: "string",
            required: true,
        },

        alternativeText: {
            type: "string",
            allowNull: true,
        },

        caption: {
            type: "string",
            allowNull: true,
        },

        width: {
            type: "number",
            allowNull: true,
        },

        height: {
            type: "number",
            allowNull: true,
        },

        formats: {
            type: "json",
        },

        hash: {
            type: "string",
        },

        ext: {
            type: "string",
        },

        mime: {
            type: "string",
        },

        size: {
            type: "number",
        }, // KB

        url: {
            type: "string",
        },

        previewUrl: {
            type: "string",
            allowNull: true,
        },

        provider: {
            type: "string",
            defaultsTo: "local",
        },

        provider_metadata: {
            type: "json",
        },

        folderPath: {
            type: "string",
            defaultsTo: "/",
        },

        isUrlSigned: {
            type: "boolean",
            defaultsTo: false,
        },

        folder: {
            model: "Folder",
        },

        uploadedBy: {
            model: "User",
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
