module.exports.datastores = {
    default: {
        adapter: "sails-mongo",
        url: process.env.MONGO_URI || "mongodb://localhost:27017/dev_db",
    },
};
