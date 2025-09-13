module.exports = {
    attributes: {
        // Cơ bản
        name: { type: "string", required: true }, // vd: firstname, lastname
        type: { type: "string", required: true }, // string, text, boolean, integer...
        configurable: { type: "boolean", defaultsTo: true },
        required: { type: "boolean", defaultsTo: false },
        unique: { type: "boolean", defaultsTo: false },
        private: { type: "boolean", defaultsTo: false },
        searchable: { type: "boolean", defaultsTo: true },
        minLength: { type: "number", allowNull: true },
        maxLength: { type: "number", allowNull: true },

        // Quan hệ
        relation: { type: "string", allowNull: true }, // manyToOne, oneToMany
        target: { type: "string", allowNull: true }, // uid contentType hoặc component
        inversedBy: { type: "string", allowNull: true },
        mappedBy: { type: "string", allowNull: true },
        targetAttribute: { type: "string", allowNull: true },

        // Thành phần nâng cao
        component: { type: "string", allowNull: true }, // uid component (cho nested component)
        components: { type: "json" }, // dynamic zone (array uid component)

        // Media
        multiple: { type: "boolean", allowNull: true },
        allowedTypes: { type: "json" }, // ["images","files","videos"]

        // Plugin options riêng
        pluginOptions: { type: "json", defaultsTo: {} },

        // Thuộc về component nào
        componentRef: { model: "Component", required: true },

        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },
};
