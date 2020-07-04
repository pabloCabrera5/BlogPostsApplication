/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
const express = require('express');
const bodyParser = require('body-parser');
const { postsRouter } = require('./routes/posts');
const { errorHandler } = require('./middlewares/errorHandler');
const app = express();
const { routeModule } = require('./routes');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
// allow json, could use express.json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('', (req, res) => {
    res.send('<h1>Welcome to the posts service, routes are in the /posts direction.</h1>');
});
app.use('/posts', postsRouter);
// routeModule(app) // used if we have more routes
app.get('*', (req, res) => {
    res.redirect('/');
});

// errors
app.use(function (err, req, res, next) {
    errorHandler(err, req, res, next);
});

app.listen(process.env.PORT || 3001, () =>
    console.log(`Listening on port ${process.env.PORT || '3001'}`));

module.exports.app = app;
