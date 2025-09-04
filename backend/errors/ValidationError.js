const BaseError = require("./BaseError");

class ValidationError extends BaseError {
    constructor(message = "Validation failed", details = {}) {
        super(message, 400, "ValidationError", details);
    }
}

module.exports = ValidationError;
