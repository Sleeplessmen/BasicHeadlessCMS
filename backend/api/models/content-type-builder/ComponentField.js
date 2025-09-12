module.exports = {
    attributes: {
        name: { type: "string", required: true }, // vd: firstname, lastname
        type: { type: "string", required: true }, // string, text, relation, media...

        configurable: { type: "boolean", defaultsTo: true },
        required: { type: "boolean", defaultsTo: false },
        unique: { type: "boolean", defaultsTo: false },
        private: { type: "boolean", defaultsTo: false },
        searchable: { type: "boolean", defaultsTo: true },

        minLength: { type: "number", allowNull: true },
        maxLength: { type: "number", allowNull: true },

        // Relation fields
        relation: { type: "string", allowNull: true },
        target: { type: "string", allowNull: true }, // uid content type hoặc component
        inversedBy: { type: "string", allowNull: true },
        mappedBy: { type: "string", allowNull: true },
        targetAttribute: { type: "string", allowNull: true },

        // Component fields
        component: { type: "string", allowNull: true }, // uid component
        components: { type: "json" }, // cho dynamic zone (array uid component)

        // Media fields
        multiple: { type: "boolean", allowNull: true },
        allowedTypes: { type: "json" },

        // Plugin options riêng cho field
        pluginOptions: { type: "json", defaultsTo: {} },

        // Thuộc về component nào
        componentRef: { model: "Component", required: true },

        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },
};
