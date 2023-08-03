const express = require('express');

const routes = express.Router();

const offer = require('../model/offermodel');

const offercontroller = require('../controller/offercontroller');


routes.get('/', offercontroller.offer_add);

routes.post('/insertoffer', offercontroller.insertoffer);

routes.get('/offer_view', offercontroller.offer_view);

routes.get('/delete/:id', offercontroller.delete);

routes.post('/mulDel', offercontroller.mulDel);

routes.get('/update/:id', offercontroller.update);

routes.post('/updateoffer', offercontroller.updateoffer);

module.exports = routes