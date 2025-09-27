module.exports = {
    // GET upload/folders
    async find(req, res) {
        // const {
        //     sort = "createdAt:DESC",
        //     page = 1,
        //     pageSize = 10,
        //     filters,
        // } = req.query;
        // const [sortField, sortOrder] = sort.split(":");
        // const where = {};
        // if (filters?.["$and"]) {
        //     const andFilters = filters["$and"];
        //     for (const f of andFilters) {
        //         if (f.parent?.id?.["$null"] === "true") {
        //             where.parent = null;
        //         }
        //     }
        // }
        // const skip = (page - 1) * pageSize;
        // const folders = await Folder.find({
        //     where,
        //     sort: `${sortField} ${sortOrder}`,
        //     skip,
        //     limit: pageSize,
        // })
        //     .populate("children")
        //     .populate("assets");
        // const result = folders.map((f) => ({
        //     ...f,
        //     children: { count: f.children?.length || 0 },
        //     files: { count: f.assets?.length || 0 },
        // }));
        // return res.json({
        //     data: result,
        // });
    },

    // GET upload/folders/:id
    async findOne(req, res) {
        try {
            const folder = await Folder.findOne({ id: req.params.id })
                .populate("assets")
                .populate("parent");

            if (!folder) return res.notFound();
            return res.json(folder);
        } catch (err) {
            return res.serverError(err);
        }
    },

    // POST upload/folders
    async create(req, res) {
        try {
            const { name, parent } = req.body;
            const newFolder = await Folder.create({ name, parent }).fetch();
            return res.json(newFolder);
        } catch (err) {
            return res.serverError(err);
        }
    },

    // PUT upload/folders/:id
    async update(req, res) {
        try {
            const { name, parent } = req.body;
            const updated = await Folder.updateOne({ id: req.params.id }).set({
                name,
                parent,
            });
            if (!updated) return res.notFound();
            return res.json(updated);
        } catch (err) {
            return res.serverError(err);
        }
    },

    // DELETE upload/folders/:id
    async destroy(req, res) {
        try {
            const deleted = await Folder.destroyOne({ id: req.params.id });
            if (!deleted) return res.notFound();
            return res.json(deleted);
        } catch (err) {
            return res.serverError(err);
        }
    },

    // GET upload/folder-structures
    async getFolderStructure(req, res) {
        try {
            // Lấy tất cả các thư mục
            const allFolders = await Folder.find().populate("children");
            return res.json(allFolders);
        } catch (err) {
            return res.serverError(err);
        }
    },
};
