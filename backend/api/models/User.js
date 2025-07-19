module.exports = {
    attributes: {
        email: {
            type: 'string',
            required: true,
            unique: true,
            isEmail: true
        },

        password: {
            type: 'string',
            required: true,
            protect: true
        },

        role: {
            model: 'role',
            required: true
        }
    }
};
