var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');

var agent = request.agent(app);

describe('GET /posts/:post/comments', function() {
  it('should respond with 200 in case of valid request', function(done) {

    agent.get('/posts')
      .send()
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var fetchedData = JSON.parse(res.text);

        var post = fetchedData[0];

        agent.get('/posts/' + post._id + '/comments')
          .send()
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            //console.log('response object in comment_test.js: ', res);
            var fetchedData = JSON.parse(res.text);
            //console.log('fetchedData: ', fetchedData);
            expect(fetchedData).to.be.an('array');
            expect(fetchedData).to.not.empty;

            var comment = fetchedData[0];

            if (comment) {
              expect(comment).to.have.all.keys('__v', '_id', 'body', 'author', 'upvotes', 'post');
              expect(comment.upvotes).to.be.a('number');
              done();
            }
          });
          done();
      });
  });
});
