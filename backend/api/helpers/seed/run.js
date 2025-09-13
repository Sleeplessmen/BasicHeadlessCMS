module.exports = {
    friendlyName: "Run seeds",
    description:
        "Chạy toàn bộ seed dữ liệu cần thiết trong môi trường development.",

    fn: async function () {
        this.sails.log("🌱 Đang chạy seed dữ liệu...");
        await require("../../../scripts/cores/seedAdminPermissions")();
        await require("../../../scripts/cores/seedAdminRoles")();
        await require("../../../scripts/cores/seedAdminUsers")();
        await require("../../../scripts/users-permissions/seedPermissions")();
        await require("../../../scripts/users-permissions/seedRoles")();
        await require("../../../scripts/users-permissions/seedUsers")();
        await require("../../../scripts/content-type-builder/seedComponents")();
        await require("../../../scripts/content-type-builder/seedContentTypes")();
        await require("../../../scripts/content-type-builder/seedComponentFields")();
        await require("../../../scripts/content-type-builder/seedContentTypeFields")();
        this.sails.log("✅ Seed hoàn tất!");
    },
};
