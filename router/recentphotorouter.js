const express = require('express');

const routes = express.Router();

const recent = require('../model/recentphotomodel');

const recentcontroller = require('../controller/recentphotocontroller');

routes.get('/', recentcontroller.recent_add);

routes.post('/insertphoto', recent.uploadavatar, recentcontroller.insertphoto);

routes.get('/recentphoto_view', recentcontroller.recentphoto_view);

routes.get('/delete/:id', recentcontroller.delete);

routes.get('/update/:id', recentcontroller.update);

routes.post('/updatephoto', recent.uploadavatar, recentcontroller.updatephoto);

routes.post('/mulDel', recentcontroller.mulDel);

module.exports = routes;