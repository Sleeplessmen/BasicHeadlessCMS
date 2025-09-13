module.exports.custom = {
    baseUrl: process.env.BASE_URL || "http://localhost:1338",
    internalEmailAddress:
        process.env.INTERNAL_EMAIL || "support@yourdomain.com",
    jwtSecret: process.env.JWT_SECRET || "dev_secret",
    dataEncryptionKey: process.env.DATA_ENCRYPTION_KEY || "dev_key_123456",
};
