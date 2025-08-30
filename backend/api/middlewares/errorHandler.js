const { errorResponse } = require("../../utils/response");

module.exports = function errorHandler(err, req, res, unusedNext) {
    console.error("❌ Error Handler:", err);

    const formatted = errorResponse(err);

    res.status(formatted.error.status || 500).json(formatted);
};
