const mongoose = require('mongoose');
const chaiHTTP = require('chai-http');
const chai = require('chai');

const { expect } = chai;
const server = require('../../server');
const User = require('../models/userModel');
const Channel = require('../models/channelModel');

chai.use(chaiHTTP);

describe('Video', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost/testVyng', { useNewUrlParser: true });
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
  let testChannel = null;
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
          testChannel = newChannels[0];
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

  describe('[POST] /video', () => {
    it('should create video', (done) => {
      const newVideo = {
        url: 'https://www.youtube.com',
        channel: testChannel.name,
        hashtags: ['cool', 'sexy'],
      };
      chai
        .request(server)
        .post('/video')
        .send(newVideo)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body['video successfully saved'].url).to.equal('https://www.youtube.com/');
          done();
        });
    });

    it('should error if url property not given', (done) => {
      const newVideo = {
        website: 'https://www.youtube.com', // error: website should be url
        channel: testChannel.name,
        hashtags: ['cool', 'sexy'],
      };
      chai
        .request(server)
        .post('/video')
        .send(newVideo)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.error.text).to.equal('missing a url and/or a channel');
          done();
        });
    });

    it('should error if channel property not given', (done) => {
      const newVideo = {
        url: 'https://www.youtube.com',
        channels: testChannel.name, // error: channels should be channel
        hashtags: ['cool', 'sexy'],
      };
      chai
        .request(server)
        .post('/video')
        .send(newVideo)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.error.text).to.equal('missing a url and/or a channel');
          done();
        });
    });

    it('should error if channel not found', (done) => {
      const newVideo = {
        url: 'https://www.youtube.com',
        channel: 'testChannel.name', // shouldn't be string version
        hashtags: ['cool', 'sexy'],
      };
      chai
        .request(server)
        .post('/video')
        .send(newVideo)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.error.text.slice(2, 19)).to.equal('channel not found');
          done();
        });
    });
  });
});
