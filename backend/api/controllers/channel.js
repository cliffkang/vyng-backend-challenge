const Channel = require('../models/channelModel');
const User = require('../models/userModel');

const createChannel = async (req, res) => {
  const { name, owner } = req.body;
  if (name && owner) {
    const newChannel = new Channel({ name });
    User.findOne({ name: owner })
      .then((result) => {
        newChannel.owner = result._id;
        newChannel.save()
          .then(channel => res.status(201).send({ 'new channel saved properly': channel }))
          .catch(err => res.status(422).send({ 'error saving channel': err }));
      })
      .catch(err => res.status(422).send({ 'error finding user': err }));
  } else {
    res.status(400).send('name and/or owner of video not given');
  }
};

const getAllChannels = (req, res) => {
  const { owner } = req.query;
  if (owner) {
    User.findOne({ name: owner })
      .then((result) => {
        Channel.find({ owner: result._id })
          .then(channels => res.status(200).send({ channels }))
          .catch(err => res.status(422).send({ 'error finding channels': err }));
      })
      .catch(err => res.status(422).send({ 'user not found': err }));
  } else {
    res.status(400).send('owner of video not given');
  }
};

module.exports = {
  createChannel,
  getAllChannels,
};
