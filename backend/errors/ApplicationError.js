const BaseError = require("./BaseError");

class ApplicationError extends BaseError {
    constructor(message = "Application error", details = {}) {
        super(message, 500, "ApplicationError", details);
    }
}

module.exports = ApplicationError;
