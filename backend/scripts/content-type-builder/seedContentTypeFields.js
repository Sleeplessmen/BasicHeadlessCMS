module.exports = async function seedContentTypeFields() {
    console.time("SeedContentTypeFields");
    sails.log("🌱 Seeding ContentTypeFields...");

    const article = await ContentType.findOne({ uid: "api::article.article" });
    const product = await ContentType.findOne({ uid: "api::product.product" });

    if (!article || !product) {
        sails.log.error("❌ Missing content types, seed ContentTypes first!");
        return;
    }

    const fieldsToSeed = [
        // ----- Article fields -----
        {
            name: "title",
            type: "string",
            required: true,
            unique: true,
            minLength: 5,
            maxLength: 150,
            searchable: true,
            contentType: article.id,
        },
        {
            name: "content",
            type: "text",
            required: true,
            searchable: true,
            contentType: article.id,
        },
        {
            name: "published",
            type: "boolean",
            defaultsTo: false,
            contentType: article.id,
        },
        {
            name: "views",
            type: "integer",
            contentType: article.id,
        },
        {
            name: "coverImage",
            type: "media",
            multiple: false,
            allowedTypes: ["images"],
            contentType: article.id,
        },
        {
            name: "category",
            type: "relation",
            relation: "manyToOne",
            target: "api::category.category",
            inversedBy: "articles",
            contentType: article.id,
        },
        {
            name: "blocks",
            type: "dynamiczone",
            components: ["shared.rich-text", "shared.media-block"],
            contentType: article.id,
        },

        // ----- Product fields -----
        {
            name: "name",
            type: "string",
            required: true,
            unique: true,
            minLength: 2,
            maxLength: 100,
            contentType: product.id,
        },
        {
            name: "description",
            type: "text",
            contentType: product.id,
        },
        {
            name: "price",
            type: "decimal",
            required: true,
            contentType: product.id,
        },
        {
            name: "images",
            type: "media",
            multiple: true,
            allowedTypes: ["images"],
            contentType: product.id,
        },
        {
            name: "specs",
            type: "component",
            component: "product.specification",
            contentType: product.id,
        },
    ];

    for (const f of fieldsToSeed) {
        const exists = await ContentTypeField.findOne({
            name: f.name,
            contentType: f.contentType,
        });
        if (!exists) {
            await ContentTypeField.create(f);
            sails.log(`✅ Created field "${f.name}"`);
        } else {
            sails.log(`⚡ Skipped field "${f.name}" (already exists)`);
        }
    }

    console.timeEnd("SeedContentTypeFields");
};
