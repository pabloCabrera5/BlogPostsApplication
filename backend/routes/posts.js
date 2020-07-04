const express = require('express');
const { commentsRouter } = require('./comments');
const postsRouter = express.Router();
const postController = require('../controllers/postsController');

// route /posts/:postId/comments
postsRouter.use('/:postId/comments', commentsRouter);

postsRouter.get('/', postController.getAllPosts);
postsRouter.get('/:postId', postController.getSinglePost);

module.exports.postsRouter = postsRouter;
