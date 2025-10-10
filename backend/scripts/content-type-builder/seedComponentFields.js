module.exports = async function seedComponentFields() {
    console.time("SeedComponentFields");
    sails.log("Seeding ComponentFields...");

    const richText = await Component.findOne({ uid: "shared.rich-text" });
    const mediaBlock = await Component.findOne({ uid: "shared.media-block" });
    const specification = await Component.findOne({
        uid: "product.specification",
    });

    if (!richText || !mediaBlock || !specification) {
        sails.log.error("Missing components, seed Components first!");
        return;
    }

    const fieldsToSeed = [
        {
            name: "content",
            type: "text",
            required: true,
            componentRef: richText.id,
            config: {
                searchable: true,
            },
        },

        {
            name: "media",
            type: "media",
            componentRef: mediaBlock.id,
            config: {
                multiple: false,
                allowedTypes: ["images", "videos"],
            },
        },
        {
            name: "caption",
            type: "string",
            componentRef: mediaBlock.id,
            config: {},
        },

        {
            name: "key",
            type: "string",
            required: true,
            componentRef: specification.id,
            config: {},
        },
        {
            name: "value",
            type: "string",
            required: true,
            componentRef: specification.id,
            config: {},
        },
    ];

    for (const f of fieldsToSeed) {
        const exists = await ComponentField.findOne({
            name: f.name,
            componentRef: f.componentRef,
        });
        if (!exists) {
            await ComponentField.create(f);
            sails.log(
                `Created field "${f.name}" for component ID ${f.componentRef}`,
            );
        } else {
            sails.log(`Skipped field "${f.name}" (already exists)`);
        }
    }

    console.timeEnd("SeedComponentFields");
};
