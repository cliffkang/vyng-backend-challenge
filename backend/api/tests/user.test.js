const mongoose = require('mongoose');
const chaiHTTP = require('chai-http');
const chai = require('chai');

const { expect } = chai;
const server = require('../../server');
const User = require('../models/userModel');

chai.use(chaiHTTP);

describe('User', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost/testVyng');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('connected!');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('[POST] /user', () => {
    it('should add a new user', (done) => {
      const newUser = new User({ name: 'newbie' });
      chai
        .request(server)
        .post('/user')
        .send(newUser)
        .end((err, res) => {
          if (err) {
            console.error('error in post /user adding new user', err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body['user successfully registered'].name).to.equal('newbie');
        });
      done();
    });

    it('returns status 422 if no name parameter sent', (done) => {
      const newUser = new User({ owner: 'newbie' });
      chai
        .request(server)
        .post('/user')
        .send(newUser)
        .end((err, res) => {
          if (err) {
            expect(res.status).to.equal(422);
            const { error } = err.response.body;
            expect(error).to.equal('Please send a name');
          }
          done();
        });
    });

    it('returns status 422 if name too short', (done) => {
      const newUser = new User({ name: 'I' });
      chai
        .request(server)
        .post('/user')
        .send(newUser)
        .end((err, res) => {
          if (err) {
            expect(res.status).to.equal(422);
            const errorMsg = err.response.body.error.name.kind;
            expect(errorMsg).to.equal('minlength');
          }
          done();
        });
    });
  });
});
