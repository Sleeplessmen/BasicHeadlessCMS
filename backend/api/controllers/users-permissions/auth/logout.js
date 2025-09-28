const jwt = require("jsonwebtoken");

module.exports = {
    friendlyName: "Logout",
    description: "Logout user (revoke JWT by blacklisting)",

    inputs: {},

    exits: {
        success: {
            description: "Logout successfully",
            responseType: "success",
        },
    },

    fn: async function (_, exits) {
        const decoded = jwt.decode(this.req.token);

        await BlacklistToken.create({
            token: this.req.token,
            expiresAt: decoded?.exp
                ? new Date(decoded.exp * 1000)
                : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return exits.success({
            message: "Logout successfully",
        });
    },
};
