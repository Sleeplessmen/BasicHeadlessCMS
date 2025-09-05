module.exports = {
    attributes: {
        contentType: {
            model: "ContentType",
            required: true,
        },

        // Dữ liệu entry theo schema của ContentType
        data: {
            type: "json",
            required: true,
        },

        status: {
            type: "string",
            isIn: ["draft", "published", "archived"],
            defaultsTo: "draft",
        },

        publishedAt: {
            type: "ref",
            columnType: "datetime",
        },

        createdBy: {
            model: "User",
        },

        updatedBy: {
            model: "User",
        },

        visibility: {
            type: "string",
            isIn: ["private", "public", "restricted"],
            defaultsTo: "private",
        },

        owner: { model: "User" },
    },

    beforeCreate: async (entry, proceed) => {
        if (entry.status === "published" && !entry.publishedAt) {
            entry.publishedAt = new Date();
        }
        return proceed();
    },

    beforeUpdate: async (entry, proceed) => {
        if (entry.status === "published" && !entry.publishedAt) {
            entry.publishedAt = new Date();
        }
        return proceed();
    },
};
