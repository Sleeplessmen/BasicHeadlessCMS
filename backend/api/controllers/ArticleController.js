module.exports = {
    async find(req, res) {
        try {
            const {
                page = 1,
                pageSize = 10,
                sort = "createdAt:DESC",
                ...filters
            } = req.query;

            // Parse sort (vd: "title:ASC" => ["title", "ASC"])
            const [sortField, sortOrder] = sort.split(":");

            // Chuyển filters về dạng Waterline criteria
            const where = {};
            if (filters.filter) {
                for (const [field, condition] of Object.entries(
                    filters.filter,
                )) {
                    for (const [op, value] of Object.entries(condition)) {
                        if (op === "$contains") {
                            where[field] = { contains: value };
                        } else if (op === "$eq") {
                            where[field] = value;
                        }
                    }
                }
            }

            const skip = (page - 1) * pageSize;

            const [data, total] = await Promise.all([
                Article.find({
                    where,
                    sort: `${sortField} ${sortOrder}`,
                    skip,
                    limit: pageSize,
                }),
                Article.count(where),
            ]);

            return res.ok({
                data,
                meta: {
                    pagination: {
                        page: Number(page),
                        pageSize: Number(pageSize),
                        pageCount: Math.ceil(total / pageSize),
                        total,
                    },
                },
            });
        } catch (err) {
            sails.log.error(err);
            return res.serverError({ message: "Failed to fetch articles" });
        }
    },
};
