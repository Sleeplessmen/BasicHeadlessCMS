module.exports = async function seedContentTypeFields() {
    console.time("SeedContentTypeFields");
    sails.log("Seeding ContentTypeFields...");

    const article = await ContentType.findOne({ uid: "api::article.article" });
    const product = await ContentType.findOne({ uid: "api::product.product" });

    if (!article || !product) {
        sails.log.error("Missing content types, seed ContentTypes first!");
        return;
    }

    const fieldsToSeed = [
        {
            name: "title",
            type: "string",
            required: true,
            unique: true,
            searchable: true,
            contentType: article.id,
            config: {
                minLength: 5,
                maxLength: 150,
            },
        },
        {
            name: "content",
            type: "text",
            required: true,
            searchable: true,
            contentType: article.id,
            config: {},
        },
        {
            name: "published",
            type: "boolean",
            contentType: article.id,
            config: {},
        },
        {
            name: "views",
            type: "integer",
            contentType: article.id,
            config: {},
        },
        {
            name: "coverImage",
            type: "media",
            contentType: article.id,
            config: {
                multiple: false,
                allowedTypes: ["images"],
            },
        },
        {
            name: "category",
            type: "relation",
            contentType: article.id,
            config: {
                relation: "manyToOne",
                target: "api::category.category",
                inversedBy: "articles",
            },
        },
        {
            name: "blocks",
            type: "dynamiczone",
            contentType: article.id,
            config: {
                components: ["shared.rich-text", "shared.media-block"],
            },
        },
    ];

    for (const f of fieldsToSeed) {
        const exists = await ContentTypeField.findOne({
            name: f.name,
            contentType: f.contentType,
        });
        if (!exists) {
            await ContentTypeField.create(f);
            sails.log(
                `Created field "${f.name}" for content type ID ${f.contentType}`,
            );
        } else {
            sails.log(`Skipped field "${f.name}" (already exists)`);
        }
    }

    console.timeEnd("SeedContentTypeFields");
};
