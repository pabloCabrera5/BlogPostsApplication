/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */

const { POSTS } = require('../constants');
const { ErrorHandler } = require('../helpers/error');
const { PostModel } = require('../models/posts');

module.exports.getAllPosts = async (req, res, next) => {
    try {
        // get all the posts
        // let results = await PostsModel.find();
        let results = POSTS;
        if (!results || !results.length) {
            // throw new ErrorHandler(404, `Sorry, there is no posts at this moment`)
            return res.status(200).json({ Status: 200, Message: `Sorry, there is no posts at this moment` });
        }
        // send all the posts
        return res.status(200).json({ Status: 200, Message: 'Here you have all the posts', Results: results, TotalPosts: results.length });
    } catch (err) {
        next(err);
    }
};

module.exports.getSinglePost = async (req, res, next) => {
    try {
        // get the id of the specific post
        let { postId } = req.params;
        postId = parseInt(postId);
        // in this scenario
        if (Number.isNaN(postId)) {
            throw new ErrorHandler(400, 'The id of the post should be a number');
        }

        // get the single post
        // let result = await PostModel.findById(postId)
        let result = POSTS.find(post => post.id === postId);
        if (!result) {
            throw new ErrorHandler(404, `There is no post with id: '${postId}'`);
        }
        // send the single post
        res.status(200).json({ Status: 200, Message: `Here you have the post with id: '${postId}'`, Results: result });
    } catch (err) {
        next(err);
    }
};
