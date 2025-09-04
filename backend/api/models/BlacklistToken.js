module.exports = {
    attributes: {
        token: {
            type: "string",
            required: true,
            unique: true,
        },
        expiredAt: {
            type: "ref",
            columnType: "datetime",
            required: true,
        },
    },
};
