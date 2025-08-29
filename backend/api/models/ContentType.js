module.exports = {
    attributes: {
        // Slug duy nhất, dùng cho endpoint API: /api/content/{slug}
        slug: {
            type: "string",
            required: true,
            unique: true,
            regex: /^[a-z0-9-]+$/,
        },

        displayName: {
            type: "string",
            required: true,
        },

        description: {
            type: "string",
            defaultsTo: "",
        },

        kind: {
            type: "string",
            isIn: ["single", "collection"],
            defaultsTo: "collection",
        },

        fields: {
            collection: "ContentField",
            via: "contentType",
        },

        isPrivate: {
            type: "boolean",
            defaultsTo: true,
        },

        apiConfig: {
            type: "json",
            description:
                "API-level settings (pagination, defaultSort, searchable fields, etc.)",
        },

        createdBy: {
            model: "User",
        },
    },

    beforeCreate: async (contentType, proceed) => {
        if (!contentType.slug) {
            contentType.slug = contentType.displayName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
        }
        return proceed();
    },
};
