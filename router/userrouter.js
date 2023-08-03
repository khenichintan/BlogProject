const express = require('express');

const routes = express.Router();



const usercontroller = require('../controller/usercontroller');

routes.get('/', usercontroller.index);

routes.get('/blog_single', usercontroller.blog_single);

routes.get('/filtergallery', usercontroller.filtergallery);

routes.get('/contact', usercontroller.contact);

routes.post('/contact_mail', usercontroller.contact_mail)

module.exports = routes;