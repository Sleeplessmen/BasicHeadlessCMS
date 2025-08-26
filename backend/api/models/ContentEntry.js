module.exports = {
    attributes: {
        // Tham chiếu đến ContentType
        contentType: {
            model: "ContentType",
            required: true,
        },

        // Dữ liệu động theo schema của ContentType
        data: {
            type: "json",
            required: true,
            description:
                'Dữ liệu theo schema, ví dụ: { title: "iPhone", price: 29000000 }',
        },

        // Trạng thái: nháp, đã xuất bản, đã ẩn
        status: {
            type: "string",
            isIn: ["draft", "published", "archived"],
            defaultsTo: "draft",
        },

        // Người tạo
        createdBy: {
            model: "User",
        },

        // Người cập nhật cuối
        updatedBy: {
            model: "User",
        },

        // Đánh dấu đã xuất bản
        publishedAt: {
            type: "ref",
            columnType: "datetime",
        },
    },

    beforeCreate: async (entry, proceed) => {
        // Tự động set publishedAt nếu status là published
        if (entry.status === "published" && !entry.publishedAt) {
            entry.publishedAt = new Date();
        }
        return proceed();
    },
    beforeUpdate: async (entry, proceed) => {
        if (entry.status === "published" && !entry.publishedAt) {
            entry.publishedAt = new Date();
        }
        return proceed();
    },
};
