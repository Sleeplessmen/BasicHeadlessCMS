const BaseError = require("./BaseError");

class PolicyError extends BaseError {
    constructor(message = "Policy Failed", details = {}) {
        super(message, 403, "PolicyError", details);
    }
}

module.exports = PolicyError;
