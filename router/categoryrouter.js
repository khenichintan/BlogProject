const express = require('express');

const routes = express.Router();

const category = require('../model/categorymodel')

const categorycontroller = require('../controller/categorycontroller');

routes.get('/category_add', categorycontroller.category_add);

routes.post('/insertcategory', categorycontroller.insertcategory);

routes.get('/category_view', categorycontroller.category_view);

routes.get('/delete/:id', categorycontroller.delete);

routes.get('/update/:id', categorycontroller.update);

routes.post('/insertcategory', categorycontroller.insertcategory);

routes.post('/mulDel', categorycontroller.mulDel);

module.exports = routes;