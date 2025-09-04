const BaseError = require("./BaseError");

class TooManyRequestsError extends BaseError {
    constructor(
        message = "Bạn đã gửi quá nhiều request. Vui lòng thử lại sau.",
        details = {},
    ) {
        super(message, 429, "TooManyRequestsError", details);
    }
}

module.exports = TooManyRequestsError;
