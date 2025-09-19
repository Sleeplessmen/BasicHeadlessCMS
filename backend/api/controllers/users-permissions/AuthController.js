module.exports = {
    async forgotPassword(req, res) {
        return res.ok({ message: "AuthController.forgotPassword" });
    },

    async resetPassword(req, res) {
        return res.ok({ message: "AuthController.resetPassword" });
    },

    async changePassword(req, res) {
        return res.ok({ message: "AuthController.changePassword" });
    },

    async connect(req, res) {
        return res.ok({ message: "AuthController.connect" });
    },

    async sendEmailConfirmation(req, res) {
        return res.ok({ message: "AuthController.sendEmailConfirmation" });
    },

    async emailConfirmation(req, res) {
        return res.ok({ message: "AuthController.emailConfirmation" });
    },
};
