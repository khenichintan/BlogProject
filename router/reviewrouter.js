const express = require('express');

const routes = express.Router();

const review = require('../model/reviewmodel');

const reviewcontroller = require('../controller/reviewcontroller');

routes.get('/', reviewcontroller.review_add);

routes.post('/insertreview', reviewcontroller.insertreview);

routes.get('/review_view', reviewcontroller.review_view);

routes.get('/delete/:id', reviewcontroller.delete);

routes.get('/update/:id', reviewcontroller.update);

routes.post('/updatereview', reviewcontroller.updatereview);

routes.post('/mulDel', reviewcontroller.mulDel);

module.exports = routes