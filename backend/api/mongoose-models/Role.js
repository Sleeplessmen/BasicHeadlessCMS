const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ví dụ: 'super_vadmin', 'admin', 'editor', 'viewer', 'custom'
    },
    description: {
        type: String,
        default: ''
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }]
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Role', roleSchema);
