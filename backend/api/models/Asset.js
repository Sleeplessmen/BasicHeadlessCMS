module.exports = {
    attributes: {
        name: {
            type: "string",
            required: true,
        }, // display name

        type: {
            type: "string",
            isIn: ["image", "video", "audio", "file"], // loại chính
            required: true,
        },

        extension: {
            type: "string",
        }, // ví dụ: .jpg, .mp4

        mimeType: {
            type: "string",
        },

        size: {
            type: "number",
        }, // tính bằng KB hoặc MB

        url: {
            type: "string",
        }, // link public

        provider: {
            type: "string",
            defaultsTo: "local",
        }, // local, s3, cloudinary, ...

        metadata: {
            type: "json",
        }, // width/height cho image, duration cho video/audio

        folder: {
            model: "Folder",
        },

        uploadedBy: {
            model: "User",
        },

        // entries: {
        //     collection: "ContentEntry",
        //     via: "data", // giả sử có custom resolver
        // },
    },
};
