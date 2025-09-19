module.exports = {
    friendlyName: "Update Schema",
    description: "Tạo, cập nhật, hoặc xóa các components và content types",

    inputs: {
        components: { type: "ref", defaultsTo: [] },
        contentTypes: { type: "ref", defaultsTo: [] },
    },

    fn: async function (inputs) {
        for (const comp of inputs.components) {
            if (comp.action === "create") {
                await ComponentService.create(comp);
            } else if (comp.action === "update") {
                await ComponentService.update(comp);
            } else if (comp.action === "delete") {
                await ComponentService.delete(comp);
            }
        }

        for (const ct of inputs.contentTypes) {
            if (ct.action === "create") {
                await ContentTypeService.create(ct);
            } else if (ct.action === "update") {
                await ContentTypeService.update(ct);
            } else if (ct.action === "delete") {
                await ContentTypeService.delete(ct);
            }
        }

        return this.res.success({ success: true }, "Schema updated");
    },
};
