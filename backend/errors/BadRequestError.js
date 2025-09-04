const BaseError = require("./BaseError");

class BadRequestError extends BaseError {
    constructor(message = "Bad request", details = {}) {
        super(message, 400, "BadRequestError", details);
    }
}

module.exports = BadRequestError;
