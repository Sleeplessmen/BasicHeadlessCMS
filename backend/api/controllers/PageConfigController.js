const fs = require('fs/promises');
const path = require('path');
const Joi = require('joi');
const responseHelper = require('../../utils/responseHelper');

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
                actions: Joi.array().items(
                    Joi.object({
                        label: Joi.string().required(),
                        type: Joi.string().valid('button', 'link', 'modal').required(),
                        method: Joi.string().valid('GET', 'POST', 'PUT', 'DELETE').required(),
                        endpoint: Joi.string().required(),
                        confirm: Joi.boolean(),
                    })
                ).optional(),
                api: Joi.object({
                    get: Joi.string(),
                    create: Joi.string(),
                    update: Joi.string(),
                    delete: Joi.string(),
                }).optional(),
            }).optional(),

            form: Joi.object({
                fields: Joi.array().items(
                    Joi.object({
                        id: Joi.string().optional(),
                        key: Joi.string().required(),
                        label: Joi.string().required(),
                        type: Joi.string().required(),
                        required: Joi.boolean(),
                        options: Joi.array().items(Joi.string()).optional(),
                        defaultValue: Joi.any().optional(),
                    })
                ),
                api: Joi.object({
                    submit: Joi.string(),
                    method: Joi.string().valid('POST', 'PUT').default('POST'),
                }).optional(),
            }).optional(),

            buttons: Joi.array().items(
                Joi.object({
                    label: Joi.string().required(),
                    action: Joi.string().required(),
                    style: Joi.string().optional(), // nếu có thêm thuộc tính style hay icon thì thêm ở đây
                })
            ).optional(),
        }).required(),

        api: Joi.object({
            get: Joi.string(),
            create: Joi.string(),
            update: Joi.string(),
            delete: Joi.string(),
        }).optional(), // fallback nếu block không có api riêng
    });

    return schema.validate(data);
};

module.exports = {
    findAll: async (req, res) => {
        try {
            const configs = await PageConfig.find();
            return res.status(200).json(responseHelper.success(configs, 'Lấy danh sách cấu hình thành công'));
        } catch (err) {
            return res.status(500).json(responseHelper.serverError(err, 'PageConfigController.findAll'));
        }
    },

    findOne: async (req, res) => {
        try {
            const { slug } = req.params;
            const config = await PageConfig.findOne({ slug });

            if (!config) {
                return res.status(404).json(responseHelper.notFound('Không tìm thấy cấu hình', slug));
            }

            return res.status(200).json(responseHelper.success(config, 'Lấy cấu hình thành công'));
        } catch (err) {
            return res.status(500).json(responseHelper.serverError(err, 'PageConfigController.findOne'));
        }
    },

    create: async (req, res) => {
        try {
            const { error, value } = validatePageConfig(req.body);
            if (error) {
                return res.status(400).json(responseHelper.validationError(error));
            }

            const existing = await PageConfig.findOne({ slug: value.slug });
            if (existing) {
                return res.status(409).json(responseHelper.badRequest(`Slug '${value.slug}' đã tồn tại`));
            }

            const created = await PageConfig.create(value).fetch();
            return res.status(201).json(responseHelper.success(created, 'Tạo cấu hình trang thành công'));
        } catch (err) {
            return res.status(500).json(responseHelper.serverError(err, 'PageConfigController.create'));
        }
    },

    update: async (req, res) => {
        try {
            const { error, value } = validatePageConfig(req.body);
            if (error) {
                return res.status(400).json(responseHelper.validationError(error));
            }

            const updated = await PageConfig.updateOne({ slug: value.slug }).set({
                ...value,
                updatedAt: new Date(),
            });

            if (!updated) {
                return res.status(404).json(responseHelper.notFound('Không tìm thấy cấu hình', value.slug));
            }

            return res.status(200).json(responseHelper.success(updated, 'Cập nhật cấu hình thành công'));
        } catch (err) {
            return res.status(500).json(responseHelper.serverError(err, 'PageConfigController.update'));
        }
    },

    delete: async (req, res) => {
        try {
            const { slug } = req.params;
            const deleted = await PageConfig.destroyOne({ slug });

            if (!deleted) {
                return res.status(404).json(responseHelper.notFound('Không tìm thấy cấu hình để xoá', slug));
            }

            return res.status(200).json(responseHelper.success(deleted, 'Xoá cấu hình thành công'));
        } catch (err) {
            return res.status(500).json(responseHelper.serverError(err, 'PageConfigController.delete'));
        }
    },

    publish: async (req, res) => {
        try {
            const configs = await PageConfig.find();
            const outputPath = path.resolve(__dirname, '../../public/page-configs.json');

            await fs.writeFile(outputPath, JSON.stringify(configs, null, 2), 'utf-8');

            return res.status(200).json(
                responseHelper.success({ path: '/public/page-configs.json' }, 'Đăng trang thành công')
            );
        } catch (err) {
            return res.status(500).json(responseHelper.serverError(err, 'PageConfigController.publish'));
        }
    },
};
