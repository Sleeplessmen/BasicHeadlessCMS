class BaseError extends Error {
    constructor(message, status = 500, name = "BaseError", details = {}) {
        super(message);
        this.status = status;
        this.name = name;
        this.details = details;
    }
}

module.exports = BaseError;
