const { errorResponse, handleServerError } = require('../../utils/responseHelper');

module.exports = (requiredPermission) => {
    return (req, res, next) => {
        try {
            const user = req.user;

            if (!user || !user.role) {
                return res.status(401).json(
                    errorResponse('Unauthorized: Người dùng chưa đăng nhập hoặc thiếu vai trò.')
                );
            }

            const permissions = user.role.permissions;

            if (!Array.isArray(permissions)) {
                sails.log.error('[hasPermission] Role.permissions không phải là mảng:', permissions);
                return res.status(500).json(
                    errorResponse('Lỗi dữ liệu: Role.permissions không hợp lệ.')
                );
            }

            const permissionNames = permissions.map(p =>
                typeof p === 'string' ? p : p.name
            );

            if (!permissionNames.includes(requiredPermission)) {
                return res.status(403).json(
                    errorResponse(
                        `Không đủ quyền: Bạn cần permission '${requiredPermission}'`,
                        { yourPermissions: permissionNames }
                    )
                );
            }

            return next();
        } catch (err) {
            sails.log.error('[hasPermission] Lỗi xử lý middleware:', err);
            return res.status(500).json(handleServerError(err));
        }
    };
};
