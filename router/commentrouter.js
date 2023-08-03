const express = require('express');

const routes = express.Router();

const comment = require('../model/commentmodel');

const commentcontroller = require('../controller/commentcontroller');

routes.post('/insertcomment', comment.uploadavatar, commentcontroller.insertcomment);

module.exports = routes;