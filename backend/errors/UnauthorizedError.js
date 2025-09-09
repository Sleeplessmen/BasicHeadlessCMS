const BaseError = require("./BaseError");

class UnauthorizedError extends BaseError {
    constructor(message = "Missing or invalid credentials", details = {}) {
        super(message, 401, "UnauthorizedError", details);
    }
}

module.exports = UnauthorizedError;
