const Channel = require('../models/channelModel');

const createChannel = (req, res) => {
  const { name, owner } = req.body;
  if (name && owner) {
    const newChannel = new Channel({ name, owner });
    newChannel.save()
      .then(channel => res.status(201).send('new channel saved properly', channel))
      .catch(err => res.status(422).send('error saving channel', err));
  } else {
    res.status(400).send('name and/or owner of video not given');
  }
};

const getAllChannels = (req, res) => {
  const { owner } = req.body;
  if (owner) {
    Channel.find({ owner })
      .then(channels => res.status(200).send(channels))
      .catch(err => res.status(422).send('error finding username', err));
  } else {
    res.status(400).send('owner of video not given');
  }
};

module.exports = {
  createChannel,
  getAllChannels,
};
