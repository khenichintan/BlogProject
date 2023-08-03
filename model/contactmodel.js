const mongoose = require('mongoose');

const path = require('path');

const contactpath = "/uploads/contact";

const multer = require('multer');

const contactSchema = mongoose.Schema({
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
        cd(null, path.join(__dirname, '..', contactpath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

contactSchema.statics.uploadavatar = multer({ storage: storage }).single('image');
contactSchema.statics.contactpath = contactpath;

const contact = mongoose.model('contact', contactSchema);
module.exports = contact;