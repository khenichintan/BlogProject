const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        require: true
    }
}, {
    timestamps: true
});

const category = mongoose.model('category', categorySchema);
module.exports = category;