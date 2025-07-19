/**
 * Product.js
 *
 * @description :: Mô hình sản phẩm trong hệ thống, có xử lý dữ liệu đầu vào.
 */

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },

        price: {
            type: 'number',
            required: true,
            min: 0
        },

        description: {
            type: 'string'
        }
    },

    // ✅ Lifecycle mới dùng async/await
    beforeCreate: async function (valuesToSet) {
        if (valuesToSet.name) {
            valuesToSet.name = valuesToSet.name.trim();
        }
        if (valuesToSet.description) {
            valuesToSet.description = valuesToSet.description.trim();
        }
    },

    beforeUpdate: async function (valuesToSet) {
        if (valuesToSet.name) {
            valuesToSet.name = valuesToSet.name.trim();
        }
        if (valuesToSet.description) {
            valuesToSet.description = valuesToSet.description.trim();
        }
    }
};
