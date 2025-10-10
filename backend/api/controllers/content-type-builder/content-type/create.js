const { ConflictError, BadRequestError } = require("../../../../errors");

module.exports = {
    friendlyName: "Create content type",
    description: "Create a new content type and its field",

    inputs: {
        uid: {
            type: "string",
            unique: true,
        },
        modelType: { type: "string", isIn: ["contentType", "component"] },
        attributes: {
            type: "json",
            defaultsTo: [],
            example: `[
            { "name": "title", "properties": { "type": "string", "required": true } },
            { "name": "cover", "properties": { "type": "media", "multiple": false } }
        ]`,
        },
        kind: {
            type: "string",
            isIn: ["collectionType", "singleType"],
            defaultsTo: "collectionType",
        },
        modelName: {
            type: "string",
        },
        globalId: {
            type: "string",
        },
        draftAndPublish: { type: "boolean" },
        displayName: {
            type: "string",
            required: true,
        },
        singularName: { type: "string" },
        pluralName: { type: "string" },
    },

    exits: {
        success: {
            responseType: "success",
        },
        conflict: {
            responseType: "conflict",
        },
        badRequest: {
            responseType: "badRequest",
        },
    },

    fn: async function (inputs, exits) {
        const db = sails.getDatastore().manager;
        const session = db.client.startSession();

        try {
            let result;

            await session.withTransaction(async (transactionSession) => {
                const modelName = inputs.modelName
                    ? await sails.helpers.format.toKebabCase(inputs.modelName)
                    : await sails.helpers.format.toKebabCase(
                          inputs.displayName,
                      );

                const uid = inputs.uid;

                const existing = await ContentType.findOne({ uid }).meta({
                    session: transactionSession,
                });
                if (existing) {
                    throw new ConflictError(`UID "${uid}" already exists`);
                }

                const newContentType = await ContentType.create({
                    uid,
                    modelName,
                    globalId:
                        inputs.globalId ||
                        (await sails.helpers.format.toPascalCase(modelName)),
                    kind: inputs.kind,
                    modelType: inputs.modelType,

                    options: { draftAndPublish: inputs.draftAndPublish },
                    info: {
                        displayName: inputs.displayName,
                        singularName: inputs.singularName || modelName,
                        pluralName: inputs.pluralName || `${modelName}s`,
                    },
                })
                    .fetch()
                    .meta({ session: transactionSession });

                let createdFields = [];
                if (inputs.attributes && inputs.attributes.length > 0) {
                    const fieldsToCreate = inputs.attributes.map((attr) => {
                        const { type, ...config } = attr.properties;
                        return {
                            name: attr.name,
                            type: type,
                            contentType: newContentType.id,
                            config: config,
                        };
                    });

                    createdFields = await ContentTypeField.createEach(
                        fieldsToCreate,
                    )
                        .fetch()
                        .meta({ session: transactionSession });
                }

                result = {
                    contentType: newContentType,
                    fields: createdFields,
                };
            });

            return exits.success({
                data: result,
                message: `Content type "${inputs.displayName}" and its fields created successfully`,
            });
        } catch (err) {
            if (err instanceof ConflictError) {
                return exits.conflict(err);
            }
            return exits.badRequest(new BadRequestError(err.message));
        } finally {
            session.endSession();
        }
    },
};
