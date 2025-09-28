module.exports = {
    friendlyName: "Format User",
    description: "Format a user object to include specific fields and roles",

    inputs: {
        user: {
            type: "ref",
            required: true,
            description: "User object to format",
        },
    },

    fn: async function (inputs) {
        return {
            id: inputs.user.id,
            firstname: inputs.user.firstname,
            lastname: inputs.user.lastname,
            email: inputs.user.email,
            isActive: inputs.user.isActive,
            roles: (inputs.user.roles || []).map((r) => ({
                id: r.id,
                name: r.name,
                code: r.code,
            })),
        };
    },
};
