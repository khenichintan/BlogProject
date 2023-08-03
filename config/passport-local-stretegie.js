const passport = require('passport');

const passportLocal = require('passport-local').Strategy

const admin = require('../model/adminmodel')

passport.use(new passportLocal({
    usernameField: "email"
}, async function(email, password, done) {
    let admindata = await admin.findOne({ email: email });
    if (admindata) {
        // console.log(admindata);
        if (admindata.password === password) {
            return done(null, admindata)
        } else {
            return done(null, false)
        }
    } else {
        return done(null, false)
    }
}));

passport.serializeUser(async function(user, done) {
    // console.log("ser");
    return done(null, user.id);
})

passport.deserializeUser(async function(id, done) {
    let AD = await admin.findById(id);
    // console.log(AD);
    if (AD) {
        return done(null, AD)
    } else {
        return done(null, false)
    }
})

passport.chaeckAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/')
    }
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        // console.log(req.user);
        res.locals.admins = req.user;
    }
    next();
}

module.exports = passport;