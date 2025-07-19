/**
 * PageConfig.js
 *
 * @description :: Cấu hình trang động (CMS) cho hệ thống.
 */

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
            // Mảng các role dạng string
        },

        layout: {
            type: 'json',
            defaultsTo: {
                table: {
                    columns: []
                },
                form: {
                    fields: []
                }
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
    },
};
