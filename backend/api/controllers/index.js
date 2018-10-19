const { createUser, getAllUsers } = require('./user');
const { createChannel, getAllChannels } = require('./channel');
const { getVideosFromHashtag, createVideo } = require('./video');

module.exports = {
  createUser,
  createChannel,
  getAllChannels,
  createVideo,
  getAllUsers,
  getVideosFromHashtag,
};
