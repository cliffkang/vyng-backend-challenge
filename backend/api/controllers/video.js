const Video = require('../models/videoModel');
const Channel = require('../models/channelModel');
const Hashtag = require('../models/hashtagModel');

const saveHashtag = (tag, videoId) => {
  Hashtag.findOneAndUpdate(
    { tag },
    { $addToSet: { videos: videoId } },
    { upsert: true, returnNewDocument: true },
  )
    .catch(err => console.error('unsuccessfully updated hashtag', err));
};

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
            video.hashtags.forEach(hashtag => saveHashtag(hashtag, video._id));
            res.status(201).send({ 'video successfully saved': video });
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
