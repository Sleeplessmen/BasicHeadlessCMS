module.exports = {
    attributes: {
        // 1. Cơ bản
        name: { type: "string", required: true }, // vd: title, description
        type: { type: "string", required: true }, // vd: string, text, relation, media, component...

        // 2. Validation đơn giản
        required: { type: "boolean", defaultsTo: false },
        unique: { type: "boolean", defaultsTo: false },
        searchable: { type: "boolean", defaultsTo: true },
        minLength: { type: "number", allowNull: true },
        maxLength: { type: "number", allowNull: true },

        // 3. Tùy chọn hiển thị
        configurable: { type: "boolean", defaultsTo: true },
        private: { type: "boolean", defaultsTo: false },

        // 4. Field quan hệ
        relation: { type: "string", allowNull: true }, // manyToOne, oneToMany...
        target: { type: "string", allowNull: true }, // uid content type đích
        inversedBy: { type: "string", allowNull: true },
        mappedBy: { type: "string", allowNull: true },
        targetAttribute: { type: "string", allowNull: true },

        // 5. Field component/dynamiczone
        component: { type: "string", allowNull: true }, // uid component
        components: { type: "json" }, // danh sách uid component cho dynamiczone

        // 6. Field media
        multiple: { type: "boolean", allowNull: true },
        allowedTypes: { type: "json" }, // ["images","files","videos"]

        // 7. Plugin options riêng cho field
        pluginOptions: { type: "json", defaultsTo: {} },

        // 8. Quan hệ với ContentType
        contentType: { model: "ContentType", required: true },

        // 9. Metadata
        createdAt: { type: "number", autoCreatedAt: true },
        updatedAt: { type: "number", autoUpdatedAt: true },
    },
};
