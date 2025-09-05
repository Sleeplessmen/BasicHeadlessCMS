const BaseError = require("./BaseError");

class ConflictError extends BaseError {
    constructor(message = "Resource already exists", details = {}) {
        super(message, 409, "ConflictError", details);
    }
}

module.exports = ConflictError;
