/* eslint-disable space-before-function-paren */

const { POSTS } = require('../constants');
const { ErrorHandler } = require('../helpers/error');

exports.getAllComments = async (req, res, next) => {
    try {
        // get the post id from request
        let { postId } = req.params;
        postId = parseInt(postId);
        // in this scenario
        if (Number.isNaN(postId)) {
            throw new ErrorHandler(400, 'The id of the post should be a number');
        }

        // get the specific post
        // let results = await PostModel.findById(postId);
        let post = POSTS.find(post => post.id === postId);
        if (!post) {
            throw new ErrorHandler(404, `There is no post with id: '${postId}'`);
        }
        // get all his comments
        let { comments } = post;
        if (!comments.length) {
            return res.status(200).json({ Status: 200, Message: `There is no comments for the post with id: '${postId}'` });
        }
        res.status(200).json({ Status: 200, Message: `Here you have all the comments for the post with id: '${postId}'`, Results: comments, TotalComments: comments.length });
    } catch (err) {
        next(err);
    }
};

exports.createComment = async (req, res, next) => {
    try {
        // get and check the params
        if (!req.body) {
            throw new ErrorHandler(400, 'Missing body in the request');
        }
        let { name = '', text } = req.body;
        let { postId } = req.params;
        postId = parseInt(postId);
        // in this scenario
        if (Number.isNaN(postId)) {
            throw new ErrorHandler(400, 'The id of the post should be a number');
        }
        name = name.trim();

        if (!text) {
            throw new ErrorHandler(400, 'Missing parameter text in the body');
        }
        // delete the spaces and check if it empty
        text = text.trim();
        if (!text) {
            throw new ErrorHandler(400, 'The field text cant be empty');
        }
        // eliminate all the double spaces (only to format text, could avoid if wanted)
        text = text.replace(/ {2,}/g, ' ');

        // create the new comment

        // let id = new Date().getTime();
        // let newComment = CommentModel({ name, text, id })

        // get the post, add the comment, and save the post
        /* let post = await PostModel.find(postId);
        if (!post) {
            throw new Error(`There is no post with the specified id: ${id}`)
        }
        post.comments.push(newComment);
        await post.save(); */

        // generate a random id based on the time, could also use uuid
        let id = new Date().getTime();
        let newComment = { name, text, id };
        let post = POSTS.find(post => post.id === postId);
        if (!post) {
            throw new ErrorHandler(404, `There is no post with id: '${postId}'`);
        }
        post.comments.push(newComment);

        res.status(200).json({ Status: 200, Message: `Your comment have been succesfully added with id: '${id}'` });
    } catch (err) {
        next(err);
    }
};

exports.updateComment = async (req, res, next) => {
    try {
        // get and check the params
        if (!req.body) {
            throw new ErrorHandler(400, 'Missing body in the request');
        }
        let { name = '', text } = req.body;
        let { postId } = req.params;
        let { commentId } = req.params;
        postId = parseInt(postId);
        commentId = parseInt(commentId);
        // in this scenario
        if (Number.isNaN(postId) || Number.isNaN(commentId)) {
            throw new ErrorHandler(400, 'Both id of the post and comment should be numbers');
        }
        if (!text) {
            throw new ErrorHandler(400, 'Missing parameter text in the body');
        }
        // delete the spaces and check if it empty
        text = text.trim();
        if (!text) {
            throw new ErrorHandler(400, 'The field text cant be empty');
        }
        // eliminate all the double spaces (only to format text, could avoid if wanted)
        text = text.replace(/ {2,}/g, ' ');

        // get the post, modify the comment, and save the post

        /* let post = await PostModel.findById(postId);
        if (!post) {
            throw new Error(`There is no post with the specified id: ${postId}`)
        }
        let comment = post.comments.find(comment => {
            comment.id === commentId
        })
        comment.text = text;
        if(name) comment.name = name;
        await post.save(); */

        let post = POSTS.find(post => post.id === postId);
        if (!post) {
            throw new ErrorHandler(404, `There is no post with id: '${postId}'`);
        }
        let comment = post.comments.find(comment => {
            if (comment.id === commentId) {
                comment.text = text;
                if (name.trim()) comment.name = name;
                return comment;
            }
        });
        if (!comment) {
            throw new ErrorHandler(404, `There is no comment with the specified id: '${commentId}' in the post with id: '${postId}'`);
        }
        res.status(200).json({ Status: 200, Message: `Your comment have been succesfully updated` });
    } catch (err) {
        next(err);
    }
};
