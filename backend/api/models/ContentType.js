module.exports = {
    attributes: {
        // Slug duy nhất, dùng trong API: /api/content/{slug}
        slug: {
            type: "string",
            required: true,
            unique: true,
            regex: /^[a-z0-9-]+$/, // chỉ chữ thường, số, gạch ngang
            description: "Dùng trong URL và API endpoint",
        },

        // Tên hiển thị
        displayName: {
            type: "string",
            required: true,
            description: "Tên hiển thị trong giao diện (ví dụ: Sản phẩm)",
        },

        // Mô tả
        description: {
            type: "string",
            defaultsTo: "",
        },

        // Các field cấu thành nội dung
        fields: {
            type: "json",
            required: true,
            description: "Danh sách field: name, type, label, required, v.v.",
            example: [
                {
                    name: "title",
                    type: "string",
                    label: "Tiêu đề",
                    required: true,
                },
                {
                    name: "price",
                    type: "number",
                    label: "Giá bán",
                    component: "currency-input",
                },
                {
                    name: "image",
                    type: "file",
                    label: "Hình ảnh",
                    component: "image-uploader",
                },
            ],
        },

        // Ai tạo
        createdBy: {
            model: "User",
        },
    },

    beforeCreate: async (contentType, proceed) => {
        // Tự động tạo slug từ displayName nếu chưa có
        if (!contentType.slug) {
            contentType.slug = contentType.displayName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
        }
        return proceed();
    },
};
