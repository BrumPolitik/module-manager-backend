var express = require('express');
var passport = require('passport');
var {Module, User, Objective, Goal, Programme} = require('../../models/Models');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('Login', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('Register', { });
});

router.post('/register', function(req, res) {
    User.register(new User({ user_id : req.body.user_id }), req.body.password_id, function(err, user) {
        if (err) {
            return res.render('Register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('Login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    //res.redirect('/');
});

//router.get('/logout', function(req, res) {
//    req.logout();
//    res.redirect('/');
//});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;