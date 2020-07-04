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

const postsController = require('../controllers/postsController');
const { app } = require('../app');
const { POSTS } = require('../constants.js');
const { stub } = require('sinon');
const { errorHandler } = require('../middlewares/errorHandler');

const URL = 'http://localhost:3000';
const ENDPOINT = '/posts';
let req = {};
let res = {};

/* afterEach(function (done) {
    // The stubs are restored after each test
    sinon.restore();
    done();
}); */

// unit tests
describe('Unit Test Posts Controller', () => {
    beforeEach(function () {
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ json: sinon.spy() })
        };
    });

    it(' get all posts should return successful ', function () {
        postsController.getAllPosts(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(res.status(200).json);
        sinon.assert.calledWith(res.status(200).json, {
            Status: 200,
            Message: 'Here you have all the posts',
            Results: POSTS,
            TotalPosts: POSTS.length
        });
    });
    it('get single post should return successful message', function () {
        req = { params: { postId: 1 } };
        postsController.getSinglePost(req, res);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(res.status(200).json);
        sinon.assert.calledWith(res.status(200).json, {
            Status: 200,
            Message: "Here you have the post with id: '1'",
            Results: POSTS[0]
        });
    });
    it('get single post should return fail message, no post with specified id', function () {
        req = { params: { postId: 7 } };
        postsController.getSinglePost(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledOnce(res.status(404).json);
        sinon.assert.calledWith(res.status(404).json, {
            Status: 404,
            Message: "There is no post with id: '7'"
        });
    });
    it('get single post should return fail message, the postid should be a message', function () {
        req = { params: { postId: 'test' } };
        postsController.getSinglePost(req, res, (err) => errorHandler(err, req, res));
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.calledOnce(res.status(400).json);
        sinon.assert.calledWith(res.status(400).json, {
            Status: 400,
            Message: 'The id of the post should be a number'
        });
    });
});

// some integrations tests
describe('Integration Test Posts Controller', () => {
    it('get all posts return succesful', (done) => {
        chai.request(app)
            .get(ENDPOINT)
            .end((err, data) => {
                expect(data.status).to.be.equal(200);
                (data.body).should.be.a('Object');
                expect(data.body).to.have.property('Results');
                expect(data.body.Results).to.be.a('Array');
                expect(data.body.Results[0]).to.be.a('Object');
                expect(data.body.Results[0]).to.haveOwnProperty('id');
                expect(data.body.Results[0]).to.haveOwnProperty('title');
                expect(data.body.Results[0]).to.haveOwnProperty('author');
                expect(data.body.Results[0]).to.haveOwnProperty('content');
                done();
            });
    });
    it('get a single post return succesful', (done) => {
        chai.request(app)
            .get(ENDPOINT + '/1')
            .end((err, data) => {
                expect(data.status).to.be.equal(200);
                (data.body).should.be.a('Object');
                expect(data.body).to.have.property('Results');
                expect(data.body.Results).to.be.a('Object');
                expect(data.body.Results).to.haveOwnProperty('id');
                expect(data.body.Results).to.haveOwnProperty('title');
                expect(data.body.Results).to.haveOwnProperty('author');
                expect(data.body.Results).to.haveOwnProperty('content');
                done();
            });
    });
    it('get a single post fail, no post with specific id', (done) => {
        chai.request(app)
            .get(ENDPOINT + '/987987')
            .end((err, data) => {
                expect(data.status).to.be.equal(404);
                (data.body).should.be.a('Object');
                expect(data.body).to.have.property('Status');
                expect(data.body).to.have.property('Message');
                expect(data.body.Message).to.be.equal(`There is no post with id: '987987'`);
                done();
            });
    });
    it('get a single post fail, postId should be a number', (done) => {
        chai.request(app)
            .get(ENDPOINT + '/test')
            .end((err, data) => {
                expect(data.status).to.be.equal(400);
                (data.body).should.be.a('Object');
                expect(data.body).to.have.property('Status');
                expect(data.body).to.have.property('Message');
                expect(data.body.Message).to.be.equal('The id of the post should be a number');
                done();
            });
    });
});
