module.exports = function UsersPermissionsHook(sails) {
    return {
        initialize: async function (cb) {
            sails.log.info("Users & Permissions hook loaded");
            return cb();
        },

        routes: {
            before: {
                "POST /auth/local": { action: "auth/login" },
                "POST /auth/register": { action: "auth/register" },
            },
            after: {
                "GET /users/me": { action: "user/me" },
            },
        },
    };
};
