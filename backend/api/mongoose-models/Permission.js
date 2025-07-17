const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ví dụ: 'view_product'
    },
    description: {
        type: String,
        default: ''
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Permission', permissionSchema);
