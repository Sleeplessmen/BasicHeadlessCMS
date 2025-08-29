// api/component/models/Component.js
module.exports = {
    attributes: {
        name: { type: "string", required: true },
        description: { type: "string" },
        repeatable: { type: "boolean", defaultsTo: false },

        // 1-n fields
        fields: {
            collection: "ComponentField",
            via: "component",
        },

        // (optional) contentType nào đang dùng component này
        contentTypes: {
            collection: "ContentType",
            via: "components",
        },
    },
};
