const BaseError = require("./BaseError");

class UnauthorizedError extends BaseError {
    constructor(message = "Unauthorized", details = {}) {
        super(message, 401, "UnauthorizedError", details);
    }
}

module.exports = UnauthorizedError;
