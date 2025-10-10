const { ConflictError, BadRequestError } = require("../../../../errors");

module.exports = {
    friendlyName: "Create Component",
    description: "Create a new component and its fields.",

    inputs: {
        uid: {
            type: "string",
            required: true,
            description: "Unique identifier, vd: 'shared.newcomp'",
        },
        modelName: {
            type: "string",
            required: true,
            description: "Tên model của component, vd: 'newcomp'",
        },
        displayName: {
            type: "string",
            required: true,
            description: "Tên hiển thị của Component, vd: 'newcomp'",
        },
        category: {
            type: "string",
            required: true,
            description: "Phân loại component, vd: 'shared', 'global'",
        },
        icon: {
            type: "string",
            description: "Tên icon hiển thị trên UI",
        },
        attributes: {
            type: "json",
            defaultsTo: [],
            description: "Mảng các field của component.",
            example: `[
            { "name": "metaTitle", "properties": { "type": "string" } }
        ]`,
        },
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
                const dataToCreate = {
                    uid: inputs.uid,
                    modelName: inputs.modelName,
                    category: inputs.category,
                    info: {
                        displayName: inputs.displayName,
                        icon: inputs.icon,
                    },
                };

                const newComponent = await Component.create(dataToCreate)
                    .fetch()
                    .meta({ session: transactionSession });

                let createdFields = [];
                if (inputs.attributes && inputs.attributes.length > 0) {
                    const fieldsToCreate = inputs.attributes.map((attr) => {
                        const { type, ...config } = attr.properties;
                        return {
                            name: attr.name,
                            type: type,
                            componentRef: newComponent.id,
                            config: config,
                        };
                    });
                    createdFields = await ComponentField.createEach(
                        fieldsToCreate,
                    )
                        .fetch()
                        .meta({ session: transactionSession });
                }

                result = { component: newComponent, fields: createdFields };
            });

            return exits.success({
                data: result,
                message: `Component "${inputs.displayName}" created successfully.`,
            });
        } catch (err) {
            if (err.code === "E_UNIQUE") {
                return exits.conflict(
                    new ConflictError(
                        `Component UID "${inputs.uid}" already exists`,
                    ),
                );
            }
            return exits.badRequest(new BadRequestError(err.message));
        } finally {
            session.endSession();
        }
    },
};
