const BaseError = require("./BaseError");

class NotFoundError extends BaseError {
    constructor(message = "Entity not found", details = {}) {
        super(message, 404, "NotFoundError", details);
    }
}

module.exports = NotFoundError;
