module.exports = {
    attributes: {
        name: { type: "string", required: true },

        type: {
            type: "string",
            isIn: [
                "text",
                "richtext",
                "number",
                "date",
                "media",
                "relation",
                "boolean",
                "json",
                "email",
                "password",
                "enumeration",
                "uid",
            ],
        },

        label: { type: "string" },
        required: { type: "boolean", defaultsTo: false },

        // Cấu hình bổ sung (enum values, default, min/max, v.v.)
        options: { type: "json" },

        // Thuộc về ContentType nào
        contentType: { model: "ContentType", required: true },

        // Nếu type = "relation" thì cần thêm metadata
        relation: {
            type: "json",
            description: `Relation config:
        {
          "target": "Category",        // tên ContentType đích
          "relationType": "manyToOne", // oneToOne, oneToMany, manyToMany, oneWay, manyWay
          "inversedBy": "restaurants"  // (optional) field ở target trỏ ngược về
        }`,
        },

        media: {
            type: "json",
            description: `Nếu type=media:
        {
            "multiple": true|false,  // cho phép nhiều file hay 1 file
            "allowedTypes": ["image", "video"], // filter loại asset
        }`,
        },
    },
};
