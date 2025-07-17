const User = require('../../api/mongoose-models/User');
const verifyToken = require('../../utils/verifyToken');
const { errorResponse, handleServerError } = require('../../utils/responseHelper');

module.exports = async function (req, res, proceed) {
    try {
        const decoded = await verifyToken(req);

        const user = await User.findById(decoded.id).populate({
            path: 'role',
            populate: {
                path: 'permissions',
                model: 'Permission'
            }
        });

        if (!user) {
            return res.status(401).json(
                errorResponse('Không xác thực được người dùng (User không tồn tại)')
            );
        }

        req.user = user;
        return proceed();
    } catch (err) {
        const statusCode = err.status || 401;
        return res.status(statusCode).json(
            handleServerError(err)
        );
    }
};
