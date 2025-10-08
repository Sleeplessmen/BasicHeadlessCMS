module.exports = {
    friendlyName: "Find all folders",
    description: "Danh sách các thư mục trong thư viện media",

    inputs: {},

    exits: {
        success: {
            description: "List all of folder successfully",
            responseType: "success",
        },
    },

    fn: async function (input, exits) {
        const {
            sort = "createdAt:DESC",
            page = 1,
            pageSize = 10,
            filters,
        } = req.query;
        const [sortField, sortOrder] = sort.split(":");
        const where = {};
        if (filters?.["$and"]) {
            const andFilters = filters["$and"];
            for (const f of andFilters) {
                if (f.parent?.id?.["$null"] === "true") {
                    where.parent = null;
                }
            }
        }
        const skip = (page - 1) * pageSize;
        const folders = await Folder.find({
            where,
            sort: `${sortField} ${sortOrder}`,
            skip,
            limit: pageSize,
        })
            .populate("children")
            .populate("assets");
        const result = folders.map((f) => ({
            ...f,
            children: { count: f.children?.length || 0 },
            files: { count: f.assets?.length || 0 },
        }));

        return exits.success({
            message: exits.success.description,
            data: result,
        });
    },
};
