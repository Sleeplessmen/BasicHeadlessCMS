module.exports = {
    attributes: {
        name: { type: "string", required: true }, // vd: title, description
        type: { type: "string", required: true }, // vd: string, text, relation, media, component...
        contentType: { model: "ContentType", required: true },

        required: { type: "boolean", defaultsTo: false },
        unique: { type: "boolean", defaultsTo: false },
        searchable: { type: "boolean", defaultsTo: true },

        config: {
            type: "json",
            defaultsTo: {},
            description: "Chứa các cấu hình riêng cho từng loại field",
        },
        /*
        Ví dụ cho config:
        - Với field 'text': { minLength: 5, maxLength: 200 }
        - Với field 'relation': { relation: 'oneToMany', target: 'api::author.author', mappedBy: 'article' }
        - Với field 'media': { multiple: true, allowedTypes: ['images'] }
        - Với field 'component': { component: 'default.seo-component', repeatable: true }
        */

        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },
};
