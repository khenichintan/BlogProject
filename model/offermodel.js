const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const offer = mongoose.model('offer', offerSchema)
module.exports = offer;