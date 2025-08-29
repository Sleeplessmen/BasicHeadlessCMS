const BaseError = require("./BaseError");

class ForbiddenError extends BaseError {
    constructor(message = "Forbidden access", details = {}) {
        super(message, 403, "ForbiddenError", details);
    }
}

module.exports = ForbiddenError;
