module.exports = async function seedContentTypes() {
    console.time("SeedContentTypes");
    sails.log("🔧 Đang chạy seedContentTypes.js...");

    const contentTypesToSeed = [
        {
            displayName: "Sản phẩm",
            slug: "product",
            description: "Quản lý các sản phẩm bán ra",
            fields: [
                {
                    name: "title",
                    type: "string",
                    label: "Tiêu đề",
                    required: true,
                },
                {
                    name: "slug",
                    type: "string",
                    label: "Slug",
                    required: true,
                },
                {
                    name: "price",
                    type: "number",
                    label: "Giá bán",
                    component: "currency-input",
                    required: true,
                },
                {
                    name: "image",
                    type: "file",
                    label: "Hình ảnh",
                    component: "image-uploader",
                },
                {
                    name: "category",
                    type: "relation",
                    label: "Danh mục",
                    relation: "category",
                    component: "select",
                },
                {
                    name: "description",
                    type: "text",
                    label: "Mô tả",
                    component: "rich-text",
                },
                {
                    name: "status",
                    type: "string",
                    label: "Trạng thái",
                    component: "select",
                    options: ["draft", "published", "archived"],
                    defaultsTo: "draft",
                },
            ],
        },
        {
            displayName: "Danh mục",
            slug: "category",
            description: "Phân loại sản phẩm",
            fields: [
                {
                    name: "name",
                    type: "string",
                    label: "Tên danh mục",
                    required: true,
                },
                {
                    name: "slug",
                    type: "string",
                    label: "Slug",
                    required: true,
                },
                {
                    name: "parent",
                    type: "relation",
                    label: "Danh mục cha",
                    relation: "category",
                    component: "tree-select",
                },
                {
                    name: "image",
                    type: "file",
                    label: "Hình ảnh",
                    component: "image-uploader",
                },
            ],
        },
        {
            displayName: "Bài viết",
            slug: "post",
            description: "Quản lý bài viết blog, tin tức",
            fields: [
                {
                    name: "title",
                    type: "string",
                    label: "Tiêu đề",
                    required: true,
                },
                {
                    name: "slug",
                    type: "string",
                    label: "Slug",
                    required: true,
                },
                {
                    name: "featuredImage",
                    type: "file",
                    label: "Ảnh nổi bật",
                    component: "image-uploader",
                },
                {
                    name: "content",
                    type: "text",
                    label: "Nội dung",
                    component: "rich-text",
                    required: true,
                },
                {
                    name: "author",
                    type: "relation",
                    label: "Tác giả",
                    relation: "user",
                    component: "select",
                },
                {
                    name: "status",
                    type: "string",
                    label: "Trạng thái",
                    component: "select",
                    options: ["draft", "published"],
                    defaultsTo: "draft",
                },
                {
                    name: "publishedAt",
                    type: "ref",
                    label: "Ngày xuất bản",
                    columnType: "datetime",
                },
            ],
        },
    ];

    try {
        // 🔥 Xóa toàn bộ content-type cũ
        await ContentType.destroy({});
        sails.log("🧹 Đã xoá toàn bộ content types cũ.");

        // ✅ Tạo mới
        const created = await ContentType.createEach(
            contentTypesToSeed
        ).fetch();
        sails.log(`✅ Đã tạo ${created.length} content type mới.`);
    } catch (err) {
        sails.log.error("❌ Lỗi khi seed content types:", err.message || err);
        if (err.stack) sails.log.error(err.stack);
        throw err;
    } finally {
        console.timeEnd("SeedContentTypes");
    }
};
