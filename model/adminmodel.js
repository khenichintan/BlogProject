const mongoose = require('mongoose');

const path = require('path');

const avatarpath = "/uploads/image";

const multer = require('multer');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobby: {
        type: Array,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
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
    }
}, {
    timestamps: true
});

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, "..", avatarpath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

adminSchema.statics.uploadavatar = multer({ storage: storage }).single('image');
adminSchema.statics.avatarpath = avatarpath;

const admin = mongoose.model('admin', adminSchema);
module.exports = admin;