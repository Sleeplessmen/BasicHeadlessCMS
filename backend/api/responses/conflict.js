module.exports = function conflict(err) {
    err.status = err.status || 409;
    return this.res.error(err);
};
