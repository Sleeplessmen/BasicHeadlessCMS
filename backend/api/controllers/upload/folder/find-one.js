const { NotFoundError } = require("../../../../errors");

module.exports = {
    friendlyName: "Find a folder by id",
    description: "Tìm kiếm một thư mục bằng mã định danh",

    inputs: {},

    exits: {
        success: {
            description: "Find folder by id successfully",
            responseType: "success",
        },
        notFound: {
            description: "Folder not found",
            responseType: "error",
        },
    },

    fn: async function (input, exits) {
        const folder = await Folder.findOne({ id: req.params.id })
            .populate("assets")
            .populate("parent");

        if (!folder)
            return exits.notFound(
                new NotFoundError("Folder with id:" + id + "not found"),
            );
        return exits.success({
            message: exits.success.description,
            data: result,
        });
    },
};
