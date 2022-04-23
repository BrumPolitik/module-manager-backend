// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const modules = require('./routes/api/modules');
const users = require('./routes/api/users');
const goals = require('./routes/api/goals');
const objectives = require('./routes/api/objectives');
const programmes = require('./routes/api/programmes');
const {request, response} = require("express");
const expressBasicAuth = require("express-basic-auth");
const compression = require("compression");
const helmet = require("helmet");

const app = express();
//const apiRouter = express.Router;

//apiRouter.route '/modules'
//    .get (request, response) => {

//    }

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(compression());
app.use(helmet());
app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('Hello world!'));
// use Routes
app.use('/api/users', users);
app.use('/api/modules', modules);
app.use('/api/goals', goals);
app.use('/api/objectives', objectives);
app.use('/api/programmes', programmes);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));