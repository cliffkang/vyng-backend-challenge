const mongoose = require('mongoose');
const chaiHTTP = require('chai-http');
const chai = require('chai');

const { expect } = chai;
const server = require('../../server');
const Channel = require('../models/channelModel');
const User = require('../models/userModel');

chai.use(chaiHTTP);

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
        const newChannels = [
          { name: 'korean pop', owner: testUser._id },
          { name: 'bhangra', owner: testUser._id },
        ];
        Channel.insertMany(newChannels, () => {
          done();
        });
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  afterEach((done) => {
    User.deleteOne({ name: 'newbie' }, (err) => {
      if (err) console.error(err);
    });
    Channel.deleteMany({}, (err) => {
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
          expect(res.status).to.equal(201);
          expect(res.body['new channel saved properly'].name).to.equal('kpop');
          done();
        });
    });

    it('should return error when no owner sent', (done) => {
      const newChannel = { name: 'kpop1', user: testUser.name }; // error: user should be owner
      chai
        .request(server)
        .post('/channel')
        .send(newChannel)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.error.text).to.equal('name and/or owner of video not given');
          done();
        });
    });

    it('should return error when no name sent', (done) => {
      const newChannel = { channel: 'kpop2', owner: testUser.name }; // error: channel should be name
      chai
        .request(server)
        .post('/channel')
        .send(newChannel)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.error.text).to.equal('name and/or owner of video not given');
          done();
        });
    });

    it('should return error if no owner found', (done) => {
      const newChannel = { name: 'kpop3', owner: 'kpop4' }; // error: kpop4 not in db
      chai
        .request(server)
        .post('/channel')
        .send(newChannel)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          const errorMsg = res.error.text.slice(2, 20);
          expect(errorMsg).to.equal('error finding user');
          done();
        });
    });

    it('should return error if channel name not at least 2 characters long', (done) => {
      const newChannel = { name: 'k', owner: testUser.name }; // error: 'k' is only 1 character long
      chai
        .request(server)
        .post('/channel')
        .send(newChannel)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          const errorMsg = res.error.text.slice(2, 22);
          expect(errorMsg).to.equal('error saving channel');
          done();
        });
    });
  });

  describe('[GET] /channels', () => {
    it('should get all channels', (done) => {
      chai
        .request(server)
        .get('/channels')
        .query({ owner: testUser.name })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.channels.length).to.equal(2);
          done();
        });
    });

    it('should error when no owner given', (done) => {
      chai
        .request(server)
        .get('/channels')
        .query({ name: testUser.name }) // should be owner, not name
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.error.text).to.equal('owner of video not given');
          done();
        });
    });

    it('should error when incorrect owner given', (done) => {
      chai
        .request(server)
        .get('/channels')
        .query({ owner: testUser._id }) // should be owner's name not mongo _id
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.error.text.slice(2, 16)).to.equal('user not found');
          done();
        });
    });
  });
});
