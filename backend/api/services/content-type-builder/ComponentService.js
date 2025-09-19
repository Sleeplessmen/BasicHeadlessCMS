const fs = require("fs");
const path = require("path");
const Reloader = require("../hooks/auto-reload/services/Reloader");

module.exports = {
    async create(comp) {
        const dir = path.resolve("api/components", comp.category);
        const file = path.join(dir, `${comp.modelName}.js`);

        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const modelContent = `
module.exports = {
  identity: '${comp.uid}',
  tableName: 'components_${comp.category}_${comp.modelName}',
  attributes: {
    ${comp.attributes.map((a) => `${a.name}: { type: '${a.properties.type}' }`).join(",\n    ")}
  }
};
    `.trim();

        fs.writeFileSync(file, modelContent, "utf8");

        await Reloader.reloadModel(
            sails,
            `api/components/${comp.category}/${comp.modelName}.js`,
        );
    },

    async update(comp) {
        return this.create(comp);
    },

    async delete(comp) {
        const file = path.resolve(
            "api/components",
            comp.category,
            `${comp.modelName}.js`,
        );
        if (fs.existsSync(file)) fs.unlinkSync(file);

        await sails.loadModels();
        await sails.hooks.orm.reload();
    },
};
