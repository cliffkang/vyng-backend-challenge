const { createUser } = require('./user');
const { createChannel, getAllChannels } = require('./channel');
const { createVideo } = require('./video');

module.exports = {
  createUser,
  createChannel,
  getAllChannels,
  createVideo,
};
