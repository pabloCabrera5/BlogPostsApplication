/* eslint-disable no-unused-vars */
/* eslint-disable handle-callback-err */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const sinon = require('sinon');
const nock = require('nock');

const commentsController = require('../controllers/commentsController');

const { app } = require('../app');
const { POSTS } = require('../constants.js');
const URL = 'http://localhost:3003';
const ENDPOINT_OK = '/posts/1/comments';
const ENDPOINT_FAIL = '/posts/999/comments';

const { errorHandler } = require('../middlewares/errorHandler');

const ENDPOINT = '/posts';
let req = {};
let res = {};
/* afterEach(function (done) {
    // The stubs are restored after each test
    sinon.restore();
    done();
}); */

// unit tests
describe('Unit Test Get Comments Controller', () => {
    beforeEach(function() {
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ json: sinon.spy() })
        };
    });

    it('get all comments for specific post should return successful ', function() {
        req = { params: { postId: 1 } };
        commentsController.getAllComments(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(res.status(200).json);
        sinon.assert.calledWith(res.status(200).json, {
            Status: 200,
            Message: `Here you have all the comments for the post with id: '1'`,
            Results: POSTS[0].comments,
            TotalComments: POSTS[0].comments.length
        });
    });
    it('get no comments for specific post should return successful ', function() {
        req = { params: { postId: 3 } };
        commentsController.getAllComments(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(res.status(200).json);
        sinon.assert.calledWith(res.status(200).json, {
            Status: 200,
            Message: `There is no comments for the post with id: '3'`
        });
    });
    it('get all comments for specific post should return fail', function() {
        req = { params: { postId: 7 } };
        commentsController.getAllComments(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledOnce(res.status(404).json);
        sinon.assert.calledWith(res.status(404).json, {
            Status: 404,
            Message: `There is no post with id: '7'`
        });
    });
    it('get all comments should return fail, bad postId', function() {
        req = {
            params: { postId: 'test' }
        };
        commentsController.getAllComments(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledOnce(res.status(400).json);
        sinon.assert.calledWith(res.status(400).json, {
            Status: 400,
            Message: 'The id of the post should be a number'
        });
    });
});
describe('Unit Test Create Comments Controller', () => {
    beforeEach(function() {
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ json: sinon.spy() })
        };
    });
    it('create new comment should return succesful', function() {
        req = {
            body: { text: 'This is a test comment' },
            params: { postId: 1 }
        };
        commentsController.createComment(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(res.status(200).json);
        /* sinon.assert.calledWith(res.status(200).json, {
            Status: 200,
            Message: 'Your comment have been succesfully added with id: ' + /\d/g
        }); */
    });
    it('create new comment should return fail, missing body', function() {
        req = {
            params: { postId: 1 }
        };
        commentsController.createComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledOnce(res.status(400).json);
        sinon.assert.calledWith(res.status(400).json, {
            Status: 400,
            Message: 'Missing body in the request'
        });
    });
    it('create new comment should return fail, bad postId', function() {
        req = {
            body: { text: 'This is a comment' },
            params: { postId: 'test' }
        };
        commentsController.createComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledOnce(res.status(400).json);
        sinon.assert.calledWith(res.status(400).json, {
            Status: 400,
            Message: 'The id of the post should be a number'
        });
    });
    it('create new comment should return fail missing text', function() {
        req = {
            body: { name: 'This is a name comment' },
            params: { postId: 1 }
        };
        commentsController.createComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledOnce(res.status(400).json);
        sinon.assert.calledWith(res.status(400).json, {
            Status: 400,
            Message: 'Missing parameter text in the body'
        });
    });
    it('create new comment should return fail, empty text', function() {
        req = {
            body: { text: '  ' },
            params: { postId: 1 }
        };
        commentsController.createComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledOnce(res.status(400).json);
        sinon.assert.calledWith(res.status(400).json, {
            Status: 400,
            Message: 'The field text cant be empty'
        });
    });
    it('create new comment should return fail, no post with specified id', function() {
        req = {
            body: { text: 'This is a comment' },
            params: { postId: 7 }
        };
        commentsController.createComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledOnce(res.status(404).json);
        sinon.assert.calledWith(res.status(404).json, {
            Status: 404,
            Message: "There is no post with id: '7'"
        });
    });
});
describe('Unit Test Update Comments Controller', () => {
    beforeEach(function() {
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ json: sinon.spy() })
        };
    });
    it('update new comment should return succesful', function() {
        req = {
            body: { text: 'This is a update comment' },
            params: {
                postId: 1,
                commentId: 11
            }
        };
        commentsController.updateComment(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(res.status(200).json);
        sinon.assert.calledWith(res.status(200).json, {
            Status: 200,
            Message: 'Your comment have been succesfully updated'
        });
    });
    it('update new comment should return fail, missing body', function() {
        req = {
            params: {
                postId: 1,
                commentId: 11
            }
        };
        commentsController.updateComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledOnce(res.status(400).json);
        sinon.assert.calledWith(res.status(400).json, {
            Status: 400,
            Message: 'Missing body in the request'
        });
    });
    it('update new comment should return fail, bad postId', function() {
        req = {
            body: { text: 'This is a comment' },
            params: {
                postId: 'test',
                commentId: 11
            }
        };
        commentsController.updateComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledOnce(res.status(400).json);
        sinon.assert.calledWith(res.status(400).json, {
            Status: 400,
            Message: 'Both id of the post and comment should be numbers'
        });
    });
    it('update new comment should return fail, bad commentId', function() {
        req = {
            body: { text: 'This is a comment' },
            params: {
                postId: 1,
                commentId: 'test'
            }
        };
        commentsController.updateComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledOnce(res.status(400).json);
        sinon.assert.calledWith(res.status(400).json, {
            Status: 400,
            Message: 'Both id of the post and comment should be numbers'
        });
    });
    it('update new comment should return fail missing text', function() {
        req = {
            body: { name: 'This is a name comment' },
            params: {
                postId: 1,
                commentId: 11
            }
        };
        commentsController.updateComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledOnce(res.status(400).json);
        sinon.assert.calledWith(res.status(400).json, {
            Status: 400,
            Message: 'Missing parameter text in the body'
        });
    });
    it('update new comment should return fail, empty text', function() {
        req = {
            body: { text: '  ' },
            params: {
                postId: 1,
                commentId: 11
            }
        };
        commentsController.updateComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledOnce(res.status(400).json);
        sinon.assert.calledWith(res.status(400).json, {
            Status: 400,
            Message: 'The field text cant be empty'
        });
    });
    it('update new comment should return fail, no post with specified id', function() {
        req = {
            body: { text: 'This is a comment' },
            params: {
                postId: 7,
                commentId: 11
            }
        };
        commentsController.updateComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledOnce(res.status(404).json);
        sinon.assert.calledWith(res.status(404).json, {
            Status: 404,
            Message: "There is no post with id: '7'"
        });
    });
    it('update new comment should return fail, no comment with specified id', function() {
        req = {
            body: { text: 'This is a comment' },
            params: {
                postId: 1,
                commentId: 99
            }
        };
        commentsController.updateComment(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledOnce(res.status(404).json);
        sinon.assert.calledWith(res.status(404).json, {
            Status: 404,
            Message: "There is no comment with the specified id: '99' in the post with id: '1'"
        });
    });
});

// some (not alls) integrations tests
describe('Integration Test Comment controller', () => {
    it('get All comments OK ', (done) => {
        chai.request(app)
            .get(ENDPOINT_OK)
            .end((err, data) => {
                expect(data.status).to.be.equal(200);
                (data.body).should.be.a('Object');
                expect(data.body).to.have.property('Results');
                expect(data.body.Results).to.be.a('Array');
                expect(data.body.Results[0]).to.be.a('Object');
                expect(data.body.Results[0]).to.haveOwnProperty('id');
                expect(data.body.Results[0]).to.haveOwnProperty('text');
                done();
            });
    });
    it('get All comments Fail, no post with specified id', (done) => {
        chai.request(app)
            .get(ENDPOINT_FAIL)
            .end((err, data) => {
                expect(data.status).to.be.equal(404);
                (data.body).should.be.a('Object');
                expect(data.body).to.have.property('Message');
                expect(data.body.Message).to.be.a('String');
                expect(data.body.Message).to.be.equal(`There is no post with id: '999'`);
                done();
            });
    });
    it('get All comments Fail, postid should be a number', (done) => {
        chai.request(app)
            .get(ENDPOINT + '/test/comments')
            .end((err, data) => {
                expect(data.status).to.be.equal(400);
                (data.body).should.be.a('Object');
                expect(data.body).to.have.property('Message');
                expect(data.body.Message).to.be.a('String');
                expect(data.body.Message).to.be.equal('The id of the post should be a number');
                done();
            });
    });

    it('create a single comment', (done) => {
        chai.request(app)
            .post(ENDPOINT_OK)
            .send({ text: 'This is a comment test' })
            .end((err, data) => {
                expect(data.status).to.be.equal(200);
                (data.body).should.be.a('Object');
                expect(data.body).to.have.property('Message');
                expect(data.body.Message).to.be.a('String');
                done();
            });
    });
    it('create a single comment Fail missing text', (done) => {
        chai.request(app)
            .post(ENDPOINT_OK)
            .send({ name: 'This is a comment test' })
            .end((err, data) => {
                expect(data.status).to.be.equal(400);
                (data.body).should.be.a('Object');
                expect(data.body).to.have.property('Message');
                expect(data.body.Message).to.be.equal('Missing parameter text in the body');
                done();
            });
    });

    it('update a single comment', (done) => {
        chai.request(app)
            .post(ENDPOINT_OK)
            .send({ text: 'This is a comment test' })
            .end((err, data) => {
                expect(data.status).to.be.equal(200);
                (data.body).should.be.a('Object');
                expect(data.body).to.have.property('Message');
                expect(data.body.Message).to.be.a('String');
                done();
            });
    });
    it('update a single comment Fail missing text', (done) => {
        chai.request(app)
            .post(ENDPOINT_OK)
            .send({ name: 'This is a comment test' })
            .end((err, data) => {
                expect(data.status).to.be.equal(400);
                (data.body).should.be.a('Object');
                expect(data.body).to.have.property('Message');
                expect(data.body.Message).to.be.equal('Missing parameter text in the body');
                done();
            });
    });
});
