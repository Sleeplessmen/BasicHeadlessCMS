module.exports = {
    friendlyName: "Logout",
    description: "Đăng xuất tài khoản",

    exits: {
        success: {
            description: "Đăng xuất thành công",
        },
    },

    fn: async function (inputs, exits) {
        delete this.req.session.userId;
        return exits.success({ message: "Đã đăng xuất" });
    },
};
