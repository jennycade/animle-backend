const users = require('./users');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use('/', users);

xtest('users route returns servercode 204 for valid userId', done => {
  request(app)
    .get('/')
});

describe('users/ POST', (done) => {
  test('returns userId', (done) => {
    request(app)
      .post('/')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(
          expect.objectContaining({
            userId: expect.any(String),
          }),
        );
        done();
      });
  });
});
