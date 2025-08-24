// api/models/File.js

module.exports = {
    attributes: {
        // Tên file gốc
        fileName: {
            type: "string",
            required: true,
        },

        // Đường dẫn lưu trữ (ví dụ: /uploads/abc.png)
        filePath: {
            type: "string",
            required: true,
        },

        // MIME type (image/png, application/pdf, v.v.)
        mimeType: {
            type: "string",
        },

        // Kích thước file (byte)
        fileSize: {
            type: "number",
        },

        // Người upload
        uploadedBy: {
            model: "User",
        },

        // Metadata tùy chọn (dùng cho ảnh: width, height, v.v.)
        metadata: {
            type: "json",
            defaultsTo: {},
        },
    },
};
