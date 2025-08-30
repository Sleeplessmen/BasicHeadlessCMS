module.exports = function attachRouteInfo(req, res, next) {
    req.state.route = {
        method: req.method,
        path: req.path,
        config: req.options || {}, // sails injects route options
        info: {
            apiName: req.options.controller || null,
            type: req.options.action || null,
        },
    };
    next();
};
