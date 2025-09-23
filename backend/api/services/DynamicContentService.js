const Ajv = require("ajv"); // npm i ajv
const ajv = new Ajv();

module.exports = {
    // Convert your attributes array -> JSON Schema object for Ajv
    buildJsonSchema(attributes) {
        const schema = { type: "object", properties: {}, required: [] };
        for (const a of attributes) {
            const name = a.name;
            const t = a.properties.type;
            switch (t) {
                case "string":
                    schema.properties[name] = { type: "string" };
                    break;
                case "number":
                    schema.properties[name] = { type: "number" };
                    break;
                case "boolean":
                    schema.properties[name] = { type: "boolean" };
                    break;
                case "json":
                    schema.properties[name] = { type: "object" };
                    break;
                case "media":
                    schema.properties[name] = { type: "object" };
                    break; // store reference object
                case "date":
                    schema.properties[name] = {
                        type: "string",
                        format: "date-time",
                    };
                    break;
                default:
                    schema.properties[name] = { type: "string" };
            }
            if (a.properties.required) schema.required.push(name);
        }
        return schema;
    },

    // Ensure physical collection/table exists and indexes created
    async applySchema(schemaDef) {
        const datastore = sails.getDatastore(); // default or use explicit name
        // --- Mongo example ---
        if (
            datastore.manager &&
            typeof datastore.manager.collection === "function"
        ) {
            const db = datastore.manager;
            const collName = schemaDef.collectionName;
            const existing = await db
                .listCollections({ name: collName })
                .toArray();
            if (existing.length === 0) {
                await db.createCollection(collName);
            }
            // create indexes if attribute has index:true
            for (const a of schemaDef.attributes) {
                if (a.properties && a.properties.index) {
                    const idx = {};
                    idx[a.name] = a.properties.index === "text" ? "text" : 1;
                    await db.collection(collName).createIndex(idx);
                }
            }
            // Save/Update schemaDef to DynamicSchema model
            await DynamicSchema.upsert({ uid: schemaDef.uid }, schemaDef);
            return;
        }

        // --- SQL example: use sendNativeQuery to create table (simplified)
        if (typeof datastore.sendNativeQuery === "function") {
            const table = schemaDef.collectionName;
            const cols = schemaDef.attributes
                .map((a) => {
                    const name = a.name;
                    const t = a.properties.type;
                    // mapping simple types
                    const colType =
                        t === "string"
                            ? "text"
                            : t === "number"
                              ? "double precision"
                              : "jsonb";
                    return `"${name}" ${colType}`;
                })
                .join(", ");
            const sql = `CREATE TABLE IF NOT EXISTS "${table}" (id VARCHAR PRIMARY KEY, ${cols});`;
            await datastore.sendNativeQuery(sql);
            await DynamicSchema.upsert({ uid: schemaDef.uid }, schemaDef);
            return;
        }

        throw new Error("Unsupported datastore for dynamic content");
    },

    // CREATE entry
    async createEntry(schemaUid, data) {
        const schema = await DynamicSchema.findOne({ uid: schemaUid });
        if (!schema) throw new Error("Schema not found: " + schemaUid);

        // validation
        const jsonSchema = this.buildJsonSchema(schema.attributes);
        const validate = ajv.compile(jsonSchema);
        if (!validate(data)) {
            const err = new Error("Validation error");
            err.details = validate.errors;
            throw err;
        }

        const datastore = sails.getDatastore();
        if (
            datastore.manager &&
            typeof datastore.manager.collection === "function"
        ) {
            const db = datastore.manager;
            const coll = db.collection(schema.collectionName);
            const now = Date.now();
            const doc = Object.assign({}, data, {
                _id: randomUUID(),
                createdAt: now,
                updatedAt: now,
            });
            const r = await coll.insertOne(doc);
            return r.ops ? r.ops[0] : { id: doc._id, ...doc };
        }
        if (typeof datastore.sendNativeQuery === "function") {
            const id = randomUUID();
            const table = schema.collectionName;
            // naive insert using JSONB column or build columns safely
            const sql = `INSERT INTO "${table}" (id, data, createdAt, updatedAt) VALUES ($1, $2, $3, $4) RETURNING *`;
            const r = await datastore.sendNativeQuery(sql, [
                id,
                JSON.stringify(data),
                Date.now(),
                Date.now(),
            ]);
            return r.rows[0];
        }
        throw new Error("Unsupported datastore for createEntry");
    },

    // FIND entries with filter, pagination
    async find(
        schemaUid,
        { where = {}, limit = 50, skip = 0, sort = null } = {},
    ) {
        const schema = await DynamicSchema.findOne({ uid: schemaUid });
        if (!schema) throw new Error("Schema not found");

        const datastore = sails.getDatastore();
        if (
            datastore.manager &&
            typeof datastore.manager.collection === "function"
        ) {
            const db = datastore.manager;
            const cursor = db.collection(schema.collectionName).find(where);
            if (sort) cursor.sort(sort);
            cursor.skip(skip).limit(limit);
            const rows = await cursor.toArray();
            return rows;
        }
        if (typeof datastore.sendNativeQuery === "function") {
            // SQL: naive get from data column
            const sql = `SELECT * FROM "${schema.collectionName}" LIMIT $1 OFFSET $2`;
            const r = await datastore.sendNativeQuery(sql, [limit, skip]);
            return r.rows;
        }
        throw new Error("Unsupported datastore");
    },

    // update, remove similar...
};
