const express = require('express');

const routes = express.Router();

const contactcontroller = require('../controller/contactcontroller');
const contact = require('../model/contactmodel');

routes.get('/contact_add', contactcontroller.contact_add);

routes.post('/insertcontact', contact.uploadavatar, contactcontroller.insertcontact);

routes.get('/contact_view', contactcontroller.contact_view)

module.exports = routes