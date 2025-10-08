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
        // ---- shared.rich-text
        {
            name: "content",
            type: "text",
            required: true,
            searchable: true,
            componentRef: richText.id,
        },

        // ---- shared.media-block
        {
            name: "media",
            type: "media",
            multiple: false,
            allowedTypes: ["images", "videos"],
            componentRef: mediaBlock.id,
        },
        {
            name: "caption",
            type: "string",
            componentRef: mediaBlock.id,
        },

        // ---- product.specification
        {
            name: "key",
            type: "string",
            required: true,
            componentRef: specification.id,
        },
        {
            name: "value",
            type: "string",
            required: true,
            componentRef: specification.id,
        },
    ];

    for (const f of fieldsToSeed) {
        const exists = await ComponentField.findOne({
            name: f.name,
            componentRef: f.componentRef,
        });
        if (!exists) {
            await ComponentField.create(f);
            sails.log(`Created field "${f.name}"`);
        } else {
            sails.log(`Skipped field "${f.name}" (already exists)`);
        }
    }

    console.timeEnd("SeedComponentFields");
};
