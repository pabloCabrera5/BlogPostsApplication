const express = require('express');
const commentController = require('../controllers/commentsController');
const commentsRouter = express.Router({ mergeParams: true });

// Route: /posts/:postId/comments & /posts/:postId/comments/:commentId

commentsRouter.route('/')
    .get(commentController.getAllComments)
    .post(commentController.createComment);

commentsRouter.put('/:commentId', commentController.updateComment);

exports.commentsRouter = commentsRouter;
