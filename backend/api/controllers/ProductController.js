const Joi = require('joi');
const { DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT } = require('../../config/constants');
const {
    handleValidationError,
    handleServerError,
    successResponse,
    notFound
} = require('../../utils/responseHelper');

module.exports = {
    findAll: async (req, res) => {
        try {
            const schema = Joi.object({
                search: Joi.string().allow('', null),
                page: Joi.number().integer().min(1).default(DEFAULT_PAGE),
                limit: Joi.number().integer().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT)
            });

            const { error, value } = schema.validate(req.query);
            if (error) return res.status(400).json(handleValidationError(error));

            const { search, page, limit } = value;
            const where = search ? { name: { contains: search } } : {};

            const [products, total] = await Promise.all([
                Product.find({ where, skip: (page - 1) * limit, limit }),
                Product.count({ where })
            ]);

            const meta = {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            };

            return res.status(200).json(successResponse(products, 'Lấy danh sách sản phẩm thành công', meta));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'ProductController.findAll'));
        }
    },

    findOne: async (req, res) => {
        try {
            const schema = Joi.object({
                id: Joi.string().required()
            });

            const { error, value } = schema.validate(req.params);
            if (error) return res.status(400).json(handleValidationError(error));

            const product = await Product.findOne({ id: value.id });
            if (!product) return res.status(404).json(notFound('Không tìm thấy sản phẩm', `ID ${value.id} không tồn tại`));

            return res.status(200).json(successResponse(product, 'Lấy sản phẩm thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'ProductController.findOne'));
        }
    },

    create: async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().min(0).required(),
                description: Joi.string().allow('', null)
            });

            const { error, value } = schema.validate(req.body);
            if (error) return res.status(400).json(handleValidationError(error));

            const newProduct = await Product.create(value).fetch();
            return res.status(201).json(successResponse(newProduct, 'Tạo sản phẩm thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'ProductController.create'));
        }
    },

    update: async (req, res) => {
        try {
            const paramSchema = Joi.object({
                id: Joi.string().required()
            });

            const bodySchema = Joi.object({
                name: Joi.string(),
                price: Joi.number().min(0),
                description: Joi.string().allow('', null)
            }).min(1);

            const { error: paramError, value: param } = paramSchema.validate(req.params);
            if (paramError) return res.status(400).json(handleValidationError(paramError));

            const { error: bodyError, value: body } = bodySchema.validate(req.body);
            if (bodyError) return res.status(400).json(handleValidationError(bodyError));

            const updated = await Product.updateOne({ id: param.id }).set(body);
            if (!updated) return res.status(404).json(notFound('Không tìm thấy sản phẩm để cập nhật', `ID ${param.id} không tồn tại`));

            return res.status(200).json(successResponse(updated, 'Cập nhật sản phẩm thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'ProductController.update'));
        }
    },

    delete: async (req, res) => {
        try {
            const schema = Joi.object({
                id: Joi.string().required()
            });

            const { error, value } = schema.validate(req.params);
            if (error) return res.status(400).json(handleValidationError(error));

            const deleted = await Product.destroyOne({ id: value.id });
            if (!deleted) return res.status(404).json(notFound('Không tìm thấy sản phẩm để xoá', `ID ${value.id} không tồn tại`));

            return res.status(200).json(successResponse(deleted, 'Xoá sản phẩm thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'ProductController.delete'));
        }
    }
};
