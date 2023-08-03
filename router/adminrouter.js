const express = require('express');

const routes = express.Router();

const admin = require('../model/adminmodel');

const admincontroller = require('../controller/admincontroller');
const passport = require('passport');

// login-logout

routes.get('/', admincontroller.login);

routes.post('/chacklogin', passport.authenticate('local', { failureRedirect: '/' }), admincontroller.chacklogin)

routes.get('/Logout', passport.chaeckAuthenticatedUser, admincontroller.Logout);

// login-logout

// password

routes.get('/password', passport.chaeckAuthenticatedUser, admincontroller.password);

routes.post('/modifypassword', passport.chaeckAuthenticatedUser, admincontroller.modifypassword);

// password

// Forget Password

routes.get('/chackemail', admincontroller.chackemail);

routes.post('/emailchack', admincontroller.emailchack);

routes.get('/chackotp', admincontroller.chackotp);

routes.post('/otpchack', admincontroller.otpchack);

routes.get('/changeforgetpass', admincontroller.changeforgetpass);

routes.post('/confirmpass', admincontroller.confirmpass)

// Forget Password

// profile

routes.get('/profile', passport.chaeckAuthenticatedUser, admincontroller.profile);

routes.get('/readmore', passport.chaeckAuthenticatedUser, admincontroller.readmore);

// profile

routes.get('/dashboard', passport.chaeckAuthenticatedUser, admincontroller.dashboard);

routes.get('/admin_add', passport.chaeckAuthenticatedUser, admincontroller.admin_add);

routes.post('/insertrecord', passport.chaeckAuthenticatedUser, admin.uploadavatar, admincontroller.insertrecord);

routes.get('/admin_view', passport.chaeckAuthenticatedUser, admincontroller.admin_view);

routes.get('/delete/:id', passport.chaeckAuthenticatedUser, admincontroller.delete);

routes.get('/update/:id', passport.chaeckAuthenticatedUser, admincontroller.update);

routes.post('/editrecord', passport.chaeckAuthenticatedUser, admin.uploadavatar, admincontroller.editrecord);

// user router

routes.use('/user', require('./userrouter'));

routes.use('/slider', passport.chaeckAuthenticatedUser, require('./sliderrouter'));

routes.use('/offer', passport.chaeckAuthenticatedUser, require('./offerrouter'));

routes.use('/recent', passport.chaeckAuthenticatedUser, require('./recentphotorouter'));

routes.use('/review', passport.chaeckAuthenticatedUser, require('./reviewrouter'));

routes.use('/blog', passport.chaeckAuthenticatedUser, require('./blogrouter'));

routes.use('/comment', require('./commentrouter'));

routes.use('/category', passport.chaeckAuthenticatedUser, require('./categoryrouter'));

routes.use('/subcategory', passport.chaeckAuthenticatedUser, require('./subcategoryrouter'));

routes.use('/contact', passport.chaeckAuthenticatedUser, require('./contactrouter'));

module.exports = routes;