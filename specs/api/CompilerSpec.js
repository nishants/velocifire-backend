const
    {expect} = require('chai'),
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

describe('/compiler', function () {
  it('should return html response from request template', function (done) {
    request(app)
        .put('/compile')
        .send({template: "<h1>hello</h1>", data: {}})
        .set('Accept', 'text/html')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end((error, response) => {
          if (error) return done(error);
          expect(response.text).to.eql("<h1>hello</h1>");
          done();
        });
  });

  it('should returned compiled html for velocity template', function (done) {
    request(app)
        .put('/compile')
        .send({template: "<h1>hello $customer.name</h1>", data: {customer: {name: "mira"}}})
        .set('Accept', 'text/html')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end((error, response) => {
          if (error) return done(error);
          expect(response.text).to.eql("<h1>hello mira</h1>");
          done();
        });
  });

  it('should return template if compilation fails', function (done) {
    request(app)
        .put('/compile')
        .send({template: "<h1>hello $customer.name</h1>", data: {}})
        .set('Accept', 'text/html')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end((error, response) => {
          if (error) return done(error);
          expect(response.text).to.eql("<h1>hello $customer.name</h1>");
          done();
        });
  });

});


// password: velocifire/54321
