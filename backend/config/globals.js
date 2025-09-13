module.exports.globals = {
    _: false, // không inject lodash toàn cục
    async: false, // không inject async toàn cục
    models: true, // cho phép gọi Model toàn cục (User.find,...)
    sails: true, // cho phép dùng sails.* toàn cục
};
