const Product = require('../mongoose-models/Product');
const { DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT } = require('../../config/constants');
const Joi = require('joi');
const {
    handleValidationError,
    handleServerError,
    successResponse,
    notFound
} = require('../../utils/responseHelper');

module.exports = {
    /**
     * @swagger
     * api/v1/products:
     *   get:
     *     summary: Lấy danh sách sản phẩm (có tìm kiếm và phân trang)
     *     tags:
     *       - Products
     *     parameters:
     *       - name: search
     *         in: query
     *         required: false
     *         description: Từ khoá tìm kiếm theo tên sản phẩm
     *         schema:
     *           type: string
     *       - name: page
     *         in: query
     *         required: false
     *         description: Số trang (bắt đầu từ 1)
     *         schema:
     *           type: integer
     *           default: 1
     *       - name: limit
     *         in: query
     *         required: false
     *         description: Số sản phẩm mỗi trang
     *         schema:
     *           type: integer
     *           default: 10
     *     responses:
     *       200:
     *         description: Lấy danh sách sản phẩm thành công
     *       400:
     *         description: Tham số truy vấn không hợp lệ
     *       500:
     *         description: Lỗi server
     */
    findAll: async (req, res) => {
        try {
            const schema = Joi.object({
                search: Joi.string().allow('', null),
                page: Joi.number().integer().min(1).default(DEFAULT_PAGE),
                limit: Joi.number().integer().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT)
            });

            const { error, value } = schema.validate(req.query);
            if (error) {
                return res.status(400).json(handleValidationError(error));
            }

            const { search, page, limit } = value;
            const query = search ? { name: { $regex: search, $options: 'i' } } : {};

            const [products, total] = await Promise.all([
                Product.find(query).skip((page - 1) * limit).limit(limit),
                Product.countDocuments(query)
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

    /**
     * @swagger
     * api/v1/products/{id}:
     *   get:
     *     summary: Lấy chi tiết sản phẩm theo ID
     *     tags:
     *       - Products
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID của sản phẩm
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Lấy sản phẩm thành công
     *       400:
     *         description: ID không hợp lệ
     *       404:
     *         description: Không tìm thấy sản phẩm
     *       500:
     *         description: Lỗi server
     */
    findOne: async (req, res) => {
        try {
            const schema = Joi.object({
                id: Joi.string().length(24).required()
            });

            const { error, value } = schema.validate(req.params);
            if (error) {
                return res.status(400).json(handleValidationError(error));
            }

            const product = await Product.findById(value.id);
            if (!product) {
                return res.status(404).json(notFound('Không tìm thấy sản phẩm', `ID ${value.id} không tồn tại`));
            }

            return res.status(200).json(successResponse(product, 'Lấy sản phẩm thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'ProductController.findOne'));
        }
    },

    /**
     * @swagger
     * api/v1/products:
     *   post:
     *     summary: Tạo sản phẩm mới
     *     tags:
     *       - Products
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - price
     *             properties:
     *               name:
     *                 type: string
     *               price:
     *                 type: number
     *               description:
     *                 type: string
     *     responses:
     *       201:
     *         description: Tạo sản phẩm thành công
     *       400:
     *         description: Dữ liệu gửi lên không hợp lệ
     *       500:
     *         description: Lỗi khi tạo sản phẩm
     */
    create: async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().min(0).required(),
                description: Joi.string().allow('', null)
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json(handleValidationError(error, 'Dữ liệu gửi lên không hợp lệ'));
            }

            const newProduct = await Product.create(value);
            return res.status(201).json(successResponse(newProduct, 'Tạo sản phẩm thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'ProductController.create'));
        }
    },

    /**
     * @swagger
     * api/v1/products/{id}:
     *   put:
     *     summary: Cập nhật thông tin sản phẩm
     *     tags:
     *       - Products
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID của sản phẩm cần cập nhật
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               price:
     *                 type: number
     *               description:
     *                 type: string
     *     responses:
     *       200:
     *         description: Cập nhật thành công
     *       400:
     *         description: Dữ liệu không hợp lệ
     *       404:
     *         description: Không tìm thấy sản phẩm
     *       500:
     *         description: Lỗi server
     */
    update: async (req, res) => {
        try {
            const paramSchema = Joi.object({
                id: Joi.string().length(24).required()
            });

            const bodySchema = Joi.object({
                name: Joi.string(),
                price: Joi.number().min(0),
                description: Joi.string().allow('', null)
            }).min(1); // Cần ít nhất 1 trường để cập nhật

            const { error: paramError, value: param } = paramSchema.validate(req.params);
            if (paramError) {
                return res.status(400).json(handleValidationError(paramError, 'ID không hợp lệ'));
            }

            const { error: bodyError, value: body } = bodySchema.validate(req.body);
            if (bodyError) {
                return res.status(400).json(handleValidationError(bodyError, 'Dữ liệu cập nhật không hợp lệ'));
            }

            const updated = await Product.findByIdAndUpdate(param.id, body, { new: true });
            if (!updated) {
                return res.status(404).json(notFound('Không tìm thấy sản phẩm để cập nhật', `ID ${param.id} không tồn tại`));
            }

            return res.status(200).json(successResponse(updated, 'Cập nhật sản phẩm thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'ProductController.update'));
        }
    },

    /**
     * @swagger
     * api/v1/products/{id}:
     *   delete:
     *     summary: Xoá sản phẩm theo ID
     *     tags:
     *       - Products
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID sản phẩm cần xoá
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Xoá thành công
     *       400:
     *         description: ID không hợp lệ
     *       404:
     *         description: Không tìm thấy sản phẩm
     *       500:
     *         description: Lỗi server
     */
    delete: async (req, res) => {
        try {
            const schema = Joi.object({
                id: Joi.string().length(24).required()
            });

            const { error, value } = schema.validate(req.params);
            if (error) {
                return res.status(400).json(handleValidationError(error, 'ID không hợp lệ'));
            }

            const deleted = await Product.findByIdAndDelete(value.id);
            if (!deleted) {
                return res.status(404).json(notFound('Không tìm thấy sản phẩm để xoá', `ID ${value.id} không tồn tại`));
            }

            return res.status(200).json(successResponse(deleted, 'Xoá sản phẩm thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'ProductController.delete'));
        }
    }
};
