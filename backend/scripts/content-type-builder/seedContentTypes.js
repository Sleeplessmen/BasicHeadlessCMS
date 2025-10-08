module.exports = async function seedContentTypes() {
    console.time("SeedContentTypes");
    sails.log("Seeding ContentTypes...");

    const contentTypesToSeed = [
        {
            uid: "api::article.article",
            modelName: "article",
            kind: "collectionType",
            globalId: "Article",
            collectionName: "articles",
            modelType: "contentType",
            visible: true,
            options: { draftAndPublish: true },
            pluginOptions: {},
            info: {
                singularName: "article",
                pluralName: "articles",
                displayName: "Article",
                description: "Collection of articles",
            },
        },
        {
            uid: "api::product.product",
            modelName: "product",
            kind: "singleType",
            globalId: "Product",
            collectionName: "products",
            modelType: "contentType",
            visible: true,
            options: {},
            pluginOptions: {},
            info: {
                singularName: "product",
                pluralName: "products",
                displayName: "Product",
                description: "Single product page",
            },
        },
    ];

    for (const ct of contentTypesToSeed) {
        const existing = await ContentType.findOne({ uid: ct.uid });
        if (!existing) {
            await ContentType.create(ct);
            sails.log(`Created ContentType: ${ct.uid}`);
        } else {
            sails.log(`Skipped (already exists): ${ct.uid}`);
        }
    }

    console.timeEnd("SeedContentTypes");
};
