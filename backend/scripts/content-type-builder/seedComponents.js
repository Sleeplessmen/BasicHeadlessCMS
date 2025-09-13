module.exports = async function seedComponents() {
    console.time("SeedComponents");
    sails.log("🌱 Seeding Components...");

    const componentsToSeed = [
        {
            uid: "shared.rich-text",
            modelName: "rich-text",
            globalId: "SharedRichText",
            collectionName: "components_shared_rich_texts",
            category: "shared",
            info: {
                displayName: "Rich Text",
                description: "Reusable rich text block",
            },
        },
        {
            uid: "shared.media-block",
            modelName: "media-block",
            globalId: "SharedMediaBlock",
            collectionName: "components_shared_media_blocks",
            category: "shared",
            info: {
                displayName: "Media Block",
                description: "Image/video with caption",
            },
        },
        {
            uid: "product.specification",
            modelName: "specification",
            globalId: "ProductSpecification",
            collectionName: "components_product_specifications",
            category: "product",
            info: {
                displayName: "Product Specification",
                description: "List of key-value specs",
            },
        },
    ];

    for (const c of componentsToSeed) {
        const existing = await Component.findOne({ uid: c.uid });
        if (!existing) {
            await Component.create(c);
            sails.log(`✅ Created Component: ${c.uid}`);
        } else {
            sails.log(`⚡ Skipped Component: ${c.uid}`);
        }
    }

    console.timeEnd("SeedComponents");
};
