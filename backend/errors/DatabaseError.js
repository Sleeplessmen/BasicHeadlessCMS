const BaseError = require("./BaseError");

class DatabaseError extends BaseError {
    constructor(message = "Database error", details = {}) {
        super(message, 500, "DatabaseError", details);
    }
}

module.exports = DatabaseError;
