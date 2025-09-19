const path = require("path");

module.exports = {
    async reloadModel(sails, modelRelativePath) {
        const fullPath = path.resolve(sails.config.appPath, modelRelativePath);

        sails.log.info(`♻️ Reloading model ${modelRelativePath}...`);

        // clear cache model đó
        if (require.cache[require.resolve(fullPath)]) {
            delete require.cache[require.resolve(fullPath)];
        }

        const def = require(fullPath);
        sails.models[def.identity] = def;

        // cập nhật Waterline ORM
        try {
            await sails.loadModels();
            await sails.hooks.orm.reload(); // reload Waterline instance
            sails.log.info(`✅ Reloaded model ${def.identity}`);
        } catch (err) {
            sails.log.error("❌ Error reload model", err);
        }
    },
};
