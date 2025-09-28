module.exports = {
    description: "Model for storing refresh tokens associated with users",

    attributes: {
        token: {
            type: "string",
            required: true,
            unique: true,
            description: "The JWT refresh token string",
        },
        user: {
            model: "AdminUser",
            required: true,
            description: "The user associated with this refresh token",
        },
        expiresAt: {
            type: "number",
            required: true,
            description: "Timestamp when the refresh token expires",
        },
        createdAt: {
            type: "number",
            autoCreatedAt: true,
            description: "Timestamp when the refresh token was created",
        },
    },

    beforeCreate: async function (values, proceed) {
        const existing = await RefreshToken.findOne({ token: values.token });
        if (existing) {
            throw new Error("Refresh token already exists");
        }
        return proceed();
    },

    beforeDestroy: async function (criteria, proceed) {
        const token = await RefreshToken.findOne(criteria);
        if (!token) {
            throw new Error("Refresh token not found");
        }
        return proceed();
    },
};
