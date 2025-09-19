const path = require("path");
const fs = require("fs");

module.exports = function patchLoadModels(sails) {
    const originalLoadModels = sails.loadModels;

    sails.loadModels = async function () {
        const modelDirs = [
            path.resolve(sails.config.appPath, "api/models"),
            path.resolve(sails.config.appPath, "api/content-types"),
            path.resolve(sails.config.appPath, "api/components"),
        ];

        let modelDefs = [];

        for (const dir of modelDirs) {
            if (!fs.existsSync(dir)) continue;
            const files = fs.readdirSync(dir, { withFileTypes: true });
            for (const f of files) {
                if (f.isFile() && f.name.endsWith(".js")) {
                    const modelPath = path.join(dir, f.name);
                    delete require.cache[require.resolve(modelPath)];
                    const def = require(modelPath);
                    modelDefs.push(def);
                } else if (f.isDirectory()) {
                    // đệ quy nếu bên trong còn thư mục
                    const subDir = path.join(dir, f.name);
                    const subFiles = fs.readdirSync(subDir);
                    for (const sf of subFiles) {
                        if (sf.endsWith(".js")) {
                            const modelPath = path.join(subDir, sf);
                            delete require.cache[require.resolve(modelPath)];
                            const def = require(modelPath);
                            modelDefs.push(def);
                        }
                    }
                }
            }
        }

        sails.models = {}; // clear cũ
        sails.log.info(`🔁 Loading ${modelDefs.length} models...`);
        await originalLoadModels.call(sails, modelDefs);
    };
};
