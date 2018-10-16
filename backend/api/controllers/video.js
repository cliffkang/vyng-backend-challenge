const Video = require('../models/videoModel');
const Channel = require('../models/channelModel');
const Hashtag = require('../models/hashtagModel');

const createVideo = (req, res) => {
  const { url, channel, hashtags } = req.body;
  if (url && channel) {
    const newVideo = new Video({ url });
    Channel.findOne({ name: channel })
      .then((chan) => {
        if (hashtags) newVideo.hashtags = hashtags;
        newVideo.channel = chan._id;
        newVideo.save()
          .then((video) => {
            video.hashtags.forEach((hashtag) => {
              if (hashtag)
            })
            res.status(201).send({ 'video successfully saved': video })
          })
          .catch(err => res.status(422).send({ 'error saving video': err }));
      })
      .catch(err => res.status(422).send({ 'channel not found': err }));
  } else {
    res.status(400).send('missing a url and/or a channel');
  }
};

module.exports = {
  createVideo,
};
