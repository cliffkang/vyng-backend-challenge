const mongoose = require('mongoose');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const server = require('../../server');
const Video = require('../models/videoModel');

describe('Video', () => {
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


});
