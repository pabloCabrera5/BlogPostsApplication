/* eslint-disable space-before-function-paren */

const { postsRouter } = require('./routes/posts');

module.exports.routeModule = function (app) {
    app.use('/posts', postsRouter);
};
