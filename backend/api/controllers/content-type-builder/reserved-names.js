module.exports = {
    friendlyName: "Get reserved Names",
    description:
        "Lấy danh sách tên bị hạn chế cho content type hoặc component trong headless CMS",

    inputs: {},

    exits: {
        success: {
            description: "Trả về danh sách các tên bị hạn chế",
        },
    },

    fn: async function (_, exits) {
        return exits.success({
            attributes: [
                "id",
                "document_id",
                "created_at",
                "updated_at",
                "published_at",
                "created_by_id",
                "updated_by_id",
                "created_by",
                "updated_by",
                "entry_id",
                "status",
                "localizations",
                "meta",
                "locale",
                "__component",
                "__contentType",
                "strapi*",
                "_strapi*",
                "__strapi*",
            ],
            models: [
                "boolean",
                "date",
                "date_time",
                "time",
                "upload",
                "document",
                "then",
                "strapi*",
                "_strapi*",
                "__strapi*",
            ],
        });
    },
};
