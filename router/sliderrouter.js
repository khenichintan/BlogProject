const express = require('express');

const routes = express.Router();

const slider = require('../model/slidermodel');

const slidercontroller = require('../controller/slidercontroller');

routes.get('/', slidercontroller.slider_add)

routes.post('/insertslider', slider.uploadavatar, slidercontroller.insertslider);

routes.get('/slider_view', slidercontroller.slider_view);

routes.get('/delete/:id', slidercontroller.delete);

routes.get('/update/:id', slidercontroller.update);

routes.post('/updateslider', slider.uploadavatar, slidercontroller.updateslider);

routes.post('/mulDel', slidercontroller.mulDel);

module.exports = routes;