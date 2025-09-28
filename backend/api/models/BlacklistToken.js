module.exports = {
    attributes: {
        token: {
            type: "string",
            required: true,
            unique: true,
        },
        expiresAt: {
            type: "number",
            required: true,
        },
        createdAt: {
            type: "number",
            autoCreatedAt: true,
        },
    },
};
