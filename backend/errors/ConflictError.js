const BaseError = require("./BaseError");

class ConflictError extends BaseError {
    constructor(message = "Resource already exists", details = {}) {
        super(409, "ConflictError", message, details);
    }
}

module.exports = ConflictError;
