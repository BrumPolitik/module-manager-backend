var express = require('express');
var rootRouter = express.Router();

var modules = require('./modules');
var users = require('./users');

rootRouter.get('/', (req, res) => {
    res.send('Hello');
});

rootRouter.get('/modules', (req, res) => {
    res.send('Hello world!');
});

rootRouter.get('/users', (req, res) => {
    res.send('Hello world!');
});

module.exports = rootRouter;