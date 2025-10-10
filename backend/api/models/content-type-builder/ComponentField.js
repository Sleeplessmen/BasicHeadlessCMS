module.exports = {
    attributes: {
        name: { type: "string", required: true },
        type: { type: "string", required: true },
        required: { type: "boolean", defaultsTo: false },

        componentRef: { model: "Component", required: true },

        config: {
            type: "json",
            defaultsTo: {},
            description: "Chứa các cấu hình riêng cho từng loại field",
        },
        /*
        Ví dụ cho config:
        - Với field 'string': { minLength: 2, maxLength: 50, unique: true }
        - Với field 'relation': { relation: 'oneToOne', target: 'api::author.author' }
        - Với field 'media': { multiple: false, allowedTypes: ['images'] }
        - Với field 'component': { component: 'shared.seo', repeatable: true }
        - Với dynamic zone: { components: ['shared.rich-text', 'shared.image-gallery'] }
        */

        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },
};
