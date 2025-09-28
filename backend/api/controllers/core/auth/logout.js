const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../../../../errors");

module.exports = {
    friendlyName: "Logout",
    description: "Logout of Admin panel",

    exits: {
        success: {
            description: "User logged out successfully",
            responseType: "success",
        },
        unauthorized: {
            description: "User not authenticated",
            responseType: "error",
        },
        badRequest: {
            description: "Invalid refresh token",
            responseType: "error",
        },
    },

    fn: async function (_, exits) {
        const req = this.req;
        const user = req.user;
        const accessToken = req.accessToken;
        const refreshToken = req.refreshToken;

        if (!user || (!accessToken && !refreshToken)) {
            return exits.unauthorized(
                new UnauthorizedError("Bạn chưa đăng nhập"),
            );
        }

        if (refreshToken) {
            const refreshTokenRecord = await RefreshToken.findOne({
                token: refreshToken,
            });
            if (!refreshTokenRecord) {
                return exits.badRequest(
                    new Error("Refresh token không hợp lệ"),
                );
            }
        }

        await AdminUser.updateOne({ id: user.id }).set({ isActive: false });

        if (accessToken) {
            const decodedAccess = jwt.decode(accessToken);
            await BlacklistToken.create({
                token: accessToken,
                expiresAt: decodedAccess?.exp
                    ? new Date(decodedAccess.exp * 1000)
                    : new Date(),
            });
        }

        if (refreshToken) {
            const decodedRefresh = jwt.decode(refreshToken);
            await BlacklistToken.create({
                token: refreshToken,
                expiresAt: decodedRefresh?.exp
                    ? new Date(decodedRefresh.exp * 1000)
                    : new Date(),
            });

            await RefreshToken.destroyOne({ token: refreshToken });
        }

        return exits.success({
            data: {},
            message: "Đăng xuất thành công",
        });
    },
};
