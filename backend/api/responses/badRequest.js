module.exports = function badRequest(err) {
    err.status = err.status || 400;
    return this.res.error(err);
};
