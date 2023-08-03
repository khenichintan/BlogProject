const mongoose = require('mongoose');

const path = require('path');

const recentpath = "/uploads/recent";

const multer = require('multer');

const recentSchema = mongoose.Schema({
    title: {
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

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, '..', recentpath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

recentSchema.statics.uploadavatar = multer({ storage: storage }).single('image');
recentSchema.statics.recentpath = recentpath;

const recent = mongoose.model('recent', recentSchema);
module.exports = recent;