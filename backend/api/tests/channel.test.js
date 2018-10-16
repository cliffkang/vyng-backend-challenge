const mongoose = require('mongoose');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const server = require('../../server');
const Channel = require('../models/channelModel');
const User = require('../models/userModel');

describe('Channel', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost/testVyng',
      { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Mongo connected!');
      done();
    });
  });
  
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
  
  let testUser = null;
  beforeEach((done) => {
    const newUser = new User({ name: 'newbie' });
    newUser.save()
      .then((user) => {
        testUser = user;
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  afterEach((done) => {
    User.deleteOne({ name: 'newbie' }, (err) => {
      if (err) console.error(err);
      done();
    });
  });

  describe('[POST] /channel', () => {
    it('should create new channel', (done) => {
      const newChannel = { name: 'kpop', owner: testUser.name };
      chai
        .request(server)
        .post('/channel')
        .send(newChannel)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(201);
          expect(res.body['new channel saved properly'].name).to.equal('kpop');
        });
      done();
    });

    it('should return error when no owner sent', (done) => {
      const newChannel = { name: 'kpop1', user: testUser.name };
      chai
        .request(server)
        .post('/channel')
        .send(newChannel)
        .end((err, res) => {
          if (err) {
            expect(res.status).to.equal(400);
            expect(err.response.body.error).to.equal('name and/or owner of video not given');
          }
          done();
        });
    });

    it('should return error when no name sent', (done) => {
      const newChannel = { channel: 'kpop2', owner: testUser.name };
      chai
        .request(server)
        .post('/channel')
        .send(newChannel)
        .end((err, res) => {
          if (err) {
            expect(res.status).to.equal(400);
            expect(err.response.body.error).to.equal('name and/or owner of video not given');
          }
          done();
        });
    });

    it('should return error if no owner found', (done) => {
      const newChannel = { name: 'kpop3', owner: 'kpop4' };
      chai
        .request(server)
        .post('/channel')
        .send(newChannel)
        .end((err, res) => {
          console.log('ERR is', err);
          // console.log('RES is', res);
          if (err) {
            expect(res.status).to.equal(422);
            expect(err.res.body.error).to.equal('name and/or owner of video not given');
          }
          done();
        });
    });
  });
});
