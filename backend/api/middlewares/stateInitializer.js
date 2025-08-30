module.exports = function stateInitializer(req, res, next) {
    req.state = {};
    next();
};
