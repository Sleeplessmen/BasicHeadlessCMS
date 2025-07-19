const fs = require('fs/promises');
const path = require('path');
const Joi = require('joi');
const {
    successResponse,
    handleValidationError,
    handleServerError,
    notFound,
} = require('../../utils/responseHelper');

const validatePageConfig = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        slug: Joi.string().required(),

        visibleForRoles: Joi.array().items(Joi.string()).optional(),

        layout: Joi.object({
            table: Joi.object({
                columns: Joi.array().items(
                    Joi.object({
                        key: Joi.string().required(),
                        label: Joi.string().required(),
                        type: Joi.string().required(),
                        sortable: Joi.boolean(),
                        searchable: Joi.boolean(),
                    })
                ),
            }),
            form: Joi.object({
                fields: Joi.array().items(
                    Joi.object({
                        key: Joi.string().required(),
                        label: Joi.string().required(),
                        type: Joi.string().required(),
                        required: Joi.boolean(),
                        options: Joi.array().items(Joi.string()).optional(),
                        defaultValue: Joi.any().optional(),
                    })
                ),
            }),
        }),

        api: Joi.object({
            get: Joi.string(),
            create: Joi.string(),
            update: Joi.string(),
            delete: Joi.string(),
        }),

        actions: Joi.array().items(
            Joi.object({
                label: Joi.string().required(),
                type: Joi.string().required(),
                method: Joi.string().required(),
                endpoint: Joi.string().required(),
                confirm: Joi.boolean(),
            })
        ),
    });

    return schema.validate(data);
};

module.exports = {
    // GET /page-config
    findAll: async (req, res) => {
        try {
            const configs = await PageConfig.find();
            return res.status(200).json(successResponse(configs));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'PageConfigController.findAll'));
        }
    },

    // GET /page-config/:slug
    findOne: async (req, res) => {
        try {
            const { slug } = req.params;
            const config = await PageConfig.findOne({ slug });

            if (!config) {
                return res.status(404).json(notFound('Không tìm thấy cấu hình', slug));
            }

            return res.status(200).json(successResponse(config));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'PageConfigController.findOne'));
        }
    },

    // POST /page-config
    create: async (req, res) => {
        try {
            const { error, value } = validatePageConfig(req.body);
            if (error) {
                return res.status(400).json(handleValidationError(error));
            }

            const existing = await PageConfig.findOne({ slug: value.slug });
            if (existing) {
                return res.status(409).json({
                    success: false,
                    message: `Slug '${value.slug}' đã tồn tại`,
                });
            }

            const created = await PageConfig.create(value).fetch();
            return res.status(201).json(successResponse(created, 'Tạo cấu hình trang thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'PageConfigController.create'));
        }
    },

    // PUT /page-config
    update: async (req, res) => {
        try {
            const { error, value } = validatePageConfig(req.body);
            if (error) {
                return res.status(400).json(handleValidationError(error));
            }

            const updated = await PageConfig.updateOne({ slug: value.slug }).set({
                ...value,
                updatedAt: new Date(),
            });

            if (!updated) {
                return res.status(404).json(notFound('Không tìm thấy cấu hình', value.slug));
            }

            return res.status(200).json(successResponse(updated, 'Cập nhật thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'PageConfigController.update'));
        }
    },

    // DELETE /page-config/:slug
    delete: async (req, res) => {
        try {
            const { slug } = req.params;
            const deleted = await PageConfig.destroyOne({ slug });

            if (!deleted) {
                return res.status(404).json(notFound('Không tìm thấy cấu hình', slug));
            }

            return res.status(200).json(successResponse(deleted, 'Xoá cấu hình thành công'));
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'PageConfigController.delete'));
        }
    },

    // POST /page-config/publish
    publish: async (req, res) => {
        try {
            const configs = await PageConfig.find();
            const outputPath = path.resolve(__dirname, '../../public/page-configs.json');

            await fs.writeFile(outputPath, JSON.stringify(configs, null, 2), 'utf-8');

            return res.status(200).json(
                successResponse({ path: '/public/page-configs.json' }, 'Đăng trang thành công')
            );
        } catch (err) {
            return res.status(500).json(handleServerError(err, 'PageConfigController.publish'));
        }
    },
};
