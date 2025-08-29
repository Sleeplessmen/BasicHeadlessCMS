const BaseError = require("./BaseError");

class ApplicationError extends BaseError {
    constructor(message = "An application error occurred", details = {}) {
        super(message, 500, "ApplicationError", details);
    }
}

module.exports = ApplicationError;
