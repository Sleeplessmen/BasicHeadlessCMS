module.exports = {
    tableName: "articles",
    attributes: {
        title: { type: "string", required: true },
        slug: { type: "string", required: true, unique: true },
        summary: { type: "string" },
        body: { type: "string", columnType: "text" },
        status: {
            type: "string",
            isIn: ["draft", "published", "archived"],
            defaultsTo: "draft",
        },
        publishedAt: { type: "ref", columnType: "datetime" },
        authorId: { type: "string" }, // reference to a User or an entries ID
        heroImageId: { type: "string" }, // media id
        tags: { type: "json", columnType: "array" }, // simple tags
        createdBy: { type: "string" },
        updatedBy: { type: "string" },
    },
    datastore: "default",
};
