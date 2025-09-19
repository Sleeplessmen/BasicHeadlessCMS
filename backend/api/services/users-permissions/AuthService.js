module.exports = {
    // onfixall
    async register(data) {
        // TODO: logic tạo user mới
        return { message: "AuthService.register", data };
    },

    async login(credentials) {
        // TODO: logic login -> JWT token
        return { message: "AuthService.login", credentials };
    },

    async logout(userId) {
        // TODO: logic logout (nếu cần lưu token blacklist)
        return { message: "AuthService.logout", userId };
    },

    async forgotPassword(email) {
        // TODO: gửi email reset password
        return { message: "AuthService.forgotPassword", email };
    },

    async resetPassword(token, newPassword) {
        // TODO: verify token + đổi mật khẩu
        return { message: "AuthService.resetPassword", token };
    },

    async changePassword(userId, oldPassword, newPassword) {
        // TODO: kiểm tra mật khẩu cũ + cập nhật
        return { message: "AuthService.changePassword", userId };
    },

    async connect(provider, profile) {
        // TODO: login bằng OAuth2/social provider
        return { message: "AuthService.connect", provider };
    },

    async sendEmailConfirmation(user) {
        // TODO: gửi email confirm
        return { message: "AuthService.sendEmailConfirmation", user };
    },

    async emailConfirmation(token) {
        // TODO: xác nhận email
        return { message: "AuthService.emailConfirmation", token };
    },

    async me(userId) {
        // TODO: lấy thông tin user hiện tại
        return { message: "AuthService.me", userId };
    },
};
