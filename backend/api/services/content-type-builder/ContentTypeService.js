const fs = require("fs");
const path = require("path");
const Reloader = require("../hooks/auto-reload/services/Reloader");

module.exports = {
    async create(ct) {
        const dir = path.resolve("api/content-types", ct.modelName);
        const file = path.join(dir, `${ct.modelName}.js`);

        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const modelContent = `
module.exports = {
  identity: '${ct.uid}',
  tableName: '${ct.modelName}',
  kind: '${ct.kind}', // 'collectionType' hoặc 'singleType'
  attributes: {
    ${ct.attributes.map((a) => `${a.name}: { type: '${a.properties.type}' }`).join(",\n    ")}
  }
};
    `.trim();

        fs.writeFileSync(file, modelContent, "utf8");

        await Reloader.reloadModel(
            sails,
            `api/content-types/${ct.modelName}/${ct.modelName}.js`,
        );
    },

    async update(ct) {
        return this.create(ct);
    },

    async delete(ct) {
        const dir = path.resolve("api/content-types", ct.modelName);
        const file = path.join(dir, `${ct.modelName}.js`);
        if (fs.existsSync(file)) fs.unlinkSync(file);

        await sails.loadModels();
        await sails.hooks.orm.reload();
    },
};
