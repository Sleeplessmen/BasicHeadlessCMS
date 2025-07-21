module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },

        slug: {
            type: 'string',
            required: true,
            unique: true
        },

        visibleForRoles: {
            type: 'json',
            defaultsTo: []
            // Mảng role có thể thấy trang này
        },

        layout: {
            type: 'json',
            defaultsTo: {
                table: {
                    columns: [],
                    actions: []
                },
                form: {
                    fields: [],
                    actions: []
                },
                buttons: []
            }
        },

        api: {
            type: 'json',
            defaultsTo: {
                get: '',
                create: '',
                update: '',
                delete: ''
            }
        },

        actions: {
            type: 'json',
            defaultsTo: []
        }
    }
};
