const express = require('express');

const routes = express.Router();

const subcategorycontroller = require('../controller/subcategorycontroller');

const subcategory = require('../model/subcategorymodel');

routes.get('/subcategory_add', subcategorycontroller.subcategory_add);

routes.post('/insertsubcate', subcategory.upImg, subcategorycontroller.insertsubcate);

routes.get('/subcategory_view', subcategorycontroller.subcategory_view);

routes.get('/delete/:id', subcategorycontroller.delete);

routes.get('/update/:id', subcategorycontroller.update);

routes.post('/updatesubcate', subcategory.upImg, subcategorycontroller.updatesubcate);

routes.post('/mulDel', subcategorycontroller.mulDel);



module.exports = routes;