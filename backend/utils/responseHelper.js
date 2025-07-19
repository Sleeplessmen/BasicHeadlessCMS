module.exports = {
    handleValidationError(error) {
        return {
            success: false,
            message: 'Tham số không hợp lệ',
            error: error.details.map(e => e.message).join(', ')
        };
    },

    handleServerError(err) {
        sails.log.error(err);
        return {
            success: false,
            message: 'Đã xảy ra lỗi server',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        };
    },

    successResponse(data, message = 'Thành công', meta = {}) {
        return {
            success: true,
            message,
            meta,
            data
        };
    },

    notFound(message = 'Không tìm thấy dữ liệu', errorDetail) {
        return {
            success: false,
            message,
            error: errorDetail
        };
    },

    errorResponse(message = 'Lỗi yêu cầu', error = null) {
        return {
            success: false,
            message,
            error
        };
    },

    unauthorized(message = 'Không có quyền truy cập', error = null) {
        return {
            success: false,
            message,
            error
        };
    }
};
