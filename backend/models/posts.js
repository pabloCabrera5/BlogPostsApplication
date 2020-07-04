const mongoose = require('mongoose');
const { CommentSchema } = require('./comments');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comment: {
        type: [CommentSchema],
        required: false
    }
}, {
    timestamps: true
});

const PostModel = mongoose.model('post', PostSchema);
exports.PostModel = PostModel;
