const mongoose = require('mongoose');

const path = require('path');

const blogpath = "/uploads/blog";

const multer = require('multer');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
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
        cd(null, path.join(__dirname, '..', blogpath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

blogSchema.statics.blogavatar = multer({ storage: storage }).single('image');
blogSchema.statics.blogpath = blogpath;

const blog = mongoose.model('blog', blogSchema);
module.exports = blog;