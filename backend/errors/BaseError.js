class BaseError extends Error {
    constructor(message, status, name, details = {}) {
        super(message);
        this.status = status;
        this.name = name;
        this.details = details;
    }
}

module.exports = BaseError;
