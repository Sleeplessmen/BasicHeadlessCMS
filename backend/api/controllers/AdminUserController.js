module.exports = {
    attributes: {
        email: { type: "string", required: true, unique: true, isEmail: true },
        password: { type: "string", required: true, protect: true },
        roles: {
            collection: "adminrole",
            via: "users",
        },
    },
};
