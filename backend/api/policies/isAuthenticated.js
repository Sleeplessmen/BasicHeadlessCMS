module.exports = async function (req, res, proceed) {
    try {
        // B1. Xác thực token
        const decoded = await JwtService.verifyToken(req);

        // B2. Tìm user và role
        const user = await User.findOne({ id: decoded.id }).populate("role");
        if (!user || !user.role) {
            return res.status(401).json(
                await sails.helpers.response.errorResponse.with({
                    err: new UnauthorizedError(
                        "Không xác thực được người dùng (User không tồn tại hoặc thiếu role)"
                    ),
                })
            );
        }

        // B3. Populate thêm permissions của role
        const roleWithPermissions = await Role.findOne({
            id: user.role.id,
        }).populate("permissions");
        user.role = roleWithPermissions;

        // B4. Gắn user vào req để controller sử dụng
        req.user = user;

        return proceed();
    } catch (err) {
        sails.log.error("[Policy:isAuthenticated] error:", err);

        // Nếu là lỗi custom BaseError thì trả về đúng status
        if (err instanceof BaseError) {
            return res
                .status(err.status)
                .json(await sails.helpers.response.errorResponse.with({ err }));
        }

        // Fallback lỗi server
        return res
            .status(500)
            .json(await sails.helpers.response.errorResponse.with({ err }));
    }
};
