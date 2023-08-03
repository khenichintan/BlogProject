const mongoose = require('mongoose');

const path = require('path');

const multer = require('multer');

const upPath = '/uploads/subcategory';

const subcategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
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
})

const imgObj = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', upPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});


subcategorySchema.statics.upImg = multer({ storage: imgObj }).single('image');
subcategorySchema.statics.upPath = upPath;

const subcategory = mongoose.model('subcategory', subcategorySchema);
module.exports = subcategory;