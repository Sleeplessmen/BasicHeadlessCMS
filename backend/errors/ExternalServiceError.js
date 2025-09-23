const BaseError = require("./BaseError");

class ExternalServiceError extends BaseError {
    constructor(message = "External service error", details = {}) {
        super(message, 502, "ExternalServiceError", details);
    }
}

module.exports = ExternalServiceError;
