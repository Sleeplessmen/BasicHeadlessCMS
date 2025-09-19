const patchLoadModels = require("./util/patchLoadModels");

module.exports = function autoReloadHook(sails) {
    return {
        initialize: async function () {
            sails.log.info("⚡ Auto-reload hook initialized");
            patchLoadModels(sails);
        },
    };
};
