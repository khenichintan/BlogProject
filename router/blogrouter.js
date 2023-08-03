const express = require('express');

const routes = express.Router();

const blog = require('../model/blogmodel');

const blogcontroller = require('../controller/blogcontroller');

routes.get('/', blogcontroller.blog_add);

routes.post('/insertblog', blog.blogavatar, blogcontroller.insertblog);

routes.get('/blog_view', blogcontroller.blog_view);

routes.get('/delete/:id', blogcontroller.delete);

routes.get('/update/:id', blogcontroller.update);

routes.post('/updateblog', blog.blogavatar, blogcontroller.updateblog);

routes.get('/comment_view', blogcontroller.commentview);

routes.post('/mulDel', blogcontroller.mulDel);

module.exports = routes;