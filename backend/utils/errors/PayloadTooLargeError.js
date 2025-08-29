const BaseError = require("./BaseError");

class PayloadTooLargeError extends BaseError {
    constructor(message = "Entity too large", details = {}) {
        super(message, 413, "PayloadTooLargeError", details);
    }
}

module.exports = PayloadTooLargeError;
