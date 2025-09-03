module.exports = function registerPublishRoutes(sails) {
    return {
        initialize: function (cb) {
            sails.log.info("Registering publish/unpublish routes...");

            const additionalActions =
                sails.config.blueprints.additionalActions || {};
            const models = Object.keys(sails.models);

            // Với mỗi model trong hệ thống -> đăng ký route publish/unpublish
            models.forEach((model) => {
                const baseRoute = `/${model.toLowerCase()}/:id`;

                if (additionalActions.publish) {
                    sails.router.bind(
                        `${additionalActions.publish.method} ${baseRoute}/publish`,
                        PublishController.publish,
                        `${model}.publish`,
                    );
                }

                if (additionalActions.unpublish) {
                    sails.router.bind(
                        `${additionalActions.unpublish.method} ${baseRoute}/unpublish`,
                        PublishController.unpublish,
                        `${model}.unpublish`,
                    );
                }
            });

            return cb();
        },
    };
};
