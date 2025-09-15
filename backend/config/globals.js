module.exports.globals = {
    _: require("lodash"),
    async: false, // không inject async toàn cục
    models: true,
    sails: true, // cho phép dùng sails.* toàn cục
};
