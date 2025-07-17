const { errorResponse, handleServerError } = require('../../utils/responseHelper');

module.exports = (permissionName) => {
    return (req, res, next) => {
        try {
            const user = req.user;

            if (!user || !user.role) {
                return res.status(401).json(
                    errorResponse('Unauthorized: Missing user or role')
                );
            }

            const permissions = user.role.permissions || [];

            if (!Array.isArray(permissions)) {
                return res.status(500).json(
                    errorResponse('Invalid permissions data structure')
                );
            }

            const permissionNames = permissions.map(p =>
                typeof p === 'string' ? p : p.name
            );

            const hasPermission = permissionNames.includes(permissionName);

            if (!hasPermission) {
                return res.status(403).json(
                    errorResponse(
                        `Forbidden: Missing permission '${permissionName}'`,
                        { yourPermissions: permissionNames }
                    )
                );
            }

            return next();
        } catch (err) {
            console.error('[hasPermission] Error:', err.message);
            return res.status(500).json(handleServerError(err));
        }
    };
};
