function buildResponse(params) {
    var res = {
        success: params.success,
        message: params.message
    };

    if (params.data) {
        res.data = params.data;
    }

    if (params.meta) {
        res.meta = params.meta;
    }

    if (params.error) {
        res.error = params.error;
    }

    if (params.code) {
        res.code = params.code;
    }

    return res;
}

function success(data, message, meta) {
    if (typeof message === 'undefined') message = 'Thành công';
    if (typeof meta === 'undefined') meta = {};

    return buildResponse({
        success: true,
        message: message,
        data: data,
        meta: meta
    });
}

function mapErrorMessage(e) {
    return e.message;
}

function validationError(error) {
    var errorMsg = 'Tham số không hợp lệ';

    if (error && error.details && Array.isArray(error.details)) {
        errorMsg = error.details.map(mapErrorMessage).join(', ');
    } else if (error && error.message) {
        errorMsg = error.message;
    }

    return buildResponse({
        success: false,
        message: 'Tham số không hợp lệ',
        error: errorMsg,
        code: 'VALIDATION_ERROR'
    });
}


function unauthorized(message) {
    if (typeof message === 'undefined') message = 'Không có quyền truy cập';

    return buildResponse({
        success: false,
        message: message,
        code: 'UNAUTHORIZED'
    });
}

function notFound(message) {
    if (typeof message === 'undefined') message = 'Không tìm thấy dữ liệu';

    return buildResponse({
        success: false,
        message: message,
        code: 'NOT_FOUND'
    });
}

function serverError(err) {
    if (typeof sails !== 'undefined' && sails.log && sails.log.error) {
        sails.log.error(err);
    }

    return buildResponse({
        success: false,
        message: 'Lỗi server',
        error: (process.env.NODE_ENV === 'development' && err && err.message) ? err.message : undefined,
        code: 'INTERNAL_ERROR'
    });
}

function badRequest(message) {
    if (typeof message === 'undefined') message = 'Tham số không hợp lệ';

    return buildResponse({
        success: false,
        message: message,
        code: 'BAD_REQUEST'
    });
}

function errorResponse(message, code, error) {
    return buildResponse({
        success: false,
        message: message || 'Lỗi không xác định',
        code: code || 'ERROR',
        error: error || null
    });
}

module.exports = {
    success: success,
    validationError: validationError,
    unauthorized: unauthorized,
    notFound: notFound,
    serverError: serverError,
    badRequest: badRequest,
    errorResponse: errorResponse
};
