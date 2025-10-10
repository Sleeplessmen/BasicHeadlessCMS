module.exports = async function seedComponents() {
    console.time("SeedComponents");
    sails.log("Seeding Components...");

    const componentsToSeed = [
        {
            modelName: "rich-text",
            category: "shared",
            info: {
                displayName: "Rich Text",
                description: "Reusable rich text block",
                icon: "feather-align-left",
            },
        },
        {
            modelName: "media-block",
            category: "shared",
            info: {
                displayName: "Media Block",
                description: "Image/video with caption",
                icon: "feather-image",
            },
        },
        {
            modelName: "specification",
            category: "product",
            info: {
                displayName: "Product Specification",
                description: "List of key-value specs",
                icon: "feather-list",
            },
        },
    ];

    for (const c of componentsToSeed) {
        const expectedUid = `${c.category}.${c.modelName}`;
        const existing = await Component.findOne({ uid: expectedUid });

        if (!existing) {
            await Component.create(c);
            sails.log(`Created Component: ${expectedUid}`);
        } else {
            sails.log(`Skipped Component: ${expectedUid} (already exists)`);
        }
    }

    console.timeEnd("SeedComponents");
};
