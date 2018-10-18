const {
  createUser,
  createChannel,
  getAllChannels,
  createVideo,
  getAllUsers,
} = require('../controllers');

module.exports = (server) => {
  server.route('/user').post(createUser);
  server.route('/channel').post(createChannel);
  server.route('/channels').get(getAllChannels);
  server.route('/video').post(createVideo);
  server.route('/users').get(getAllUsers);
};
