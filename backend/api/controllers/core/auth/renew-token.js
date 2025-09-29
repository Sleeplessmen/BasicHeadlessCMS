const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../../../../errors");

module.exports = {
    friendlyName: "Refresh Token",
    description: "Refresh JWT access token using a refresh token",

    exits: {
        success: {
            description: "Token refreshed successfully",
            responseType: "success",
        },
        badRequest: {
            description: "Invalid refresh token",
            responseType: "error",
        },
        unauthorized: {
            description: "Unauthorized access",
            responseType: "error",
        },
    },

    fn: async function (_, exits) {
        const req = this.req;
        const user = req.user;
        const refreshToken = req.refreshToken;

        if (!user || !refreshToken) {
            return exits.badRequest(
                new BadRequestError("Refresh token không hợp lệ"),
            );
        }

        const newAccessToken = jwt.sign(
            { id: user.id, type: "access" },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" },
        );

        const formattedUser = await sails.helpers.auth.formatUser(user);

        return exits.success({
            data: { user: formattedUser, accessToken: newAccessToken },
            message: "Làm mới token thành công",
        });
    },
};
