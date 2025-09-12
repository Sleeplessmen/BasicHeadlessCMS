module.exports = {
    attributes: {
        name: { type: "string", required: true }, // vd: title, description, categories
        type: { type: "string", required: true }, // vd: string, text, relation, media, component, dynamiczone...

        configurable: { type: "boolean", defaultsTo: true },
        required: { type: "boolean", defaultsTo: false },
        unique: { type: "boolean", defaultsTo: false },
        private: { type: "boolean", defaultsTo: false },
        searchable: { type: "boolean", defaultsTo: true },

        minLength: { type: "number", allowNull: true },
        maxLength: { type: "number", allowNull: true },

        // Relation fields
        relation: { type: "string", allowNull: true }, // manyToOne, oneToMany, manyToMany, morphToMany...
        target: { type: "string", allowNull: true }, // uid của content type khác
        inversedBy: { type: "string", allowNull: true },
        mappedBy: { type: "string", allowNull: true },
        targetAttribute: { type: "string", allowNull: true },

        // Component fields
        component: { type: "string", allowNull: true }, // uid component
        components: { type: "json" }, // array uid component cho dynamiczone

        // Media fields
        multiple: { type: "boolean", allowNull: true },
        allowedTypes: { type: "json" }, // ["images","files","videos"]

        // Plugin options riêng cho field
        pluginOptions: { type: "json", defaultsTo: {} },

        // Thuộc về contentType nào
        contentType: { model: "ContentType", required: true },

        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },
};
