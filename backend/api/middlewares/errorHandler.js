const { BaseError, ApplicationError, DatabaseError } = require("../../errors");

module.exports = async function errorHandler(err, req, res, next) {
    sails.log.error("Global Error Handler caught:", err);

    try {
        if (err instanceof BaseError) {
            return res.error(err);
        }

        if (err.name === "AdapterError") {
            const dbError = new DatabaseError(err.message, {
                originalError: err,
            });
            return res.error(dbError);
        }

        const wrappedError = new ApplicationError(
            "Lỗi hệ thống không xác định",
            {
                raw: err.message || err,
                url: req.url,
                method: req.method,
            },
        );

        return res.error(wrappedError);
    } catch (formattingError) {
        sails.log.error(
            "FATAL: Error handler failed to format its own error:",
            formattingError,
        );
        return res.status(500).json({
            errors: [
                {
                    name: "SystemError",
                    message: "Lỗi hệ thống nghiêm trọng.",
                },
            ],
        });
    }
};
