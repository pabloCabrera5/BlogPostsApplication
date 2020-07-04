const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const CommentModel = mongoose.model('comment', CommentSchema);
exports.CommentModel = CommentModel;
exports.CommentSchema = CommentSchema;
