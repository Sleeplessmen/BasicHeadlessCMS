const BaseError = require("./BaseError");

class ValidationError extends BaseError {
    constructor(message = "Tham số không hợp lệ", details = {}) {
        super(message, 400, "ValidationError", details);
    }
}

module.exports = ValidationError;
