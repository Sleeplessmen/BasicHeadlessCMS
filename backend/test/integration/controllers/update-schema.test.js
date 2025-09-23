const path = require("node:path");
const fs = require("fs-extra");
const supertest = require("supertest");
const assert = require("assert");
const Sails = require("sails");

describe("UpdateSchema Action", function () {
    let sailsApp;
    const modelFile = path.resolve("api/models/components/shared/user.js");

    before(async function () {
        if (!global.sails) {
            sailsApp = await Sails.lift({
                appPath: path.resolve(__dirname, "../../../"), // ✅ chỉ định thư mục gốc project
                hooks: {
                    grunt: false, // tắt grunt để test nhanh hơn
                },
                log: { level: "warn" },
                models: { migrate: "drop" },
            });
        } else {
            sailsApp = global.sails;
        }

        if (!sailsApp?.hooks?.http?.app) {
            throw new Error("HTTP hook was not loaded");
        }
    });

    after(async function () {
        if (await fs.pathExists(modelFile)) {
            await fs.remove(modelFile);
        }
        if (sailsApp?.lower) {
            await sailsApp.lower();
        }
    });

    it("should create or update the component model file", async function () {
        const payload = {
            data: {
                components: [
                    {
                        action: "update",
                        uid: "shared.user",
                        category: "shared",
                        modelName: "user",
                        attributes: [
                            {
                                name: "firstnam",
                                properties: { type: "string" },
                            },
                            {
                                name: "lastname",
                                properties: { type: "string" },
                            },
                            { name: "job", properties: { type: "string" } },
                            {
                                name: "image",
                                properties: {
                                    type: "media",
                                    multiple: false,
                                    required: false,
                                    allowedTypes: ["images"],
                                },
                            },
                        ],
                    },
                ],
                contentTypes: [],
            },
        };

        const res = await supertest(sailsApp.hooks.http.app)
            .post("/api/v1/admin/content-type-builder/update-schema")
            .send(payload.data)
            .expect(200);

        assert.strictEqual(
            res.body.success,
            true,
            "Response should return success true",
        );

        const exists = await fs.pathExists(modelFile);
        assert.ok(exists, "Model file should exist");

        const content = await fs.readFile(modelFile, "utf8");
        assert.ok(content.includes("firstnam"));
        assert.ok(content.includes("lastname"));
        assert.ok(content.includes("job"));
        assert.ok(content.includes("image"));
    });
});
