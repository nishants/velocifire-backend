const
    request = require('supertest'),
    app = require('../../src/app');

describe('Ping /', function () {
  it('respond with message', function (done) {
    request(app)
        .get('/hello')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
  });
});
