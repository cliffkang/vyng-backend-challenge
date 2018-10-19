const Video = require('../models/videoModel');
const Channel = require('../models/channelModel');
const Hashtag = require('../models/hashtagModel');

const createVideo = (req, res) => {
  const { youtubeId, url, channel, hashtags } = req.body;
  if (url && channel && youtubeId) {
    const newVideo = new Video({ url, youtubeId });
    Channel.findOne({ name: channel })
      .then((chan) => {
        newVideo.hashtags = hashtags;
        newVideo.channel = chan._id;
        newVideo.save()
          .then((video) => {
            video.hashtags.forEach(hashtag => saveHashtag(hashtag, video.youtubeId));
            saveHashtagsToChannel(video.hashtags, video.channel);
            res.status(201).send({ 'video successfully saved': video });
          })
          .catch(err => res.status(422).send({ 'error saving video': err }));
      })
      .catch(err => res.status(422).send({ 'channel not found': err }));
  } else {
    res.status(400).send('missing a url and/or a channel');
  }
};

const getVideosFromHashtag = (req, res) => {
  const { tag } = req.query;
  if (tag) {
    Hashtag.findOne({ tag })
      .then(foundTag => res.status(200).send({ videos: foundTag.videos }))
      .catch(err => res.status(422).send({ 'error finding videos from hashtag': err }));
  } else {
    res.status(400).send('missing a tag');
  }
};

const saveHashtag = (tag, youtubeId) => {
  Hashtag.findOneAndUpdate(
    { tag },
    { $addToSet: { videos: youtubeId } },
    { upsert: true, returnNewDocument: true },
  )
    .catch(err => console.error('unsuccessfully updated hashtag', err));
};

const saveHashtagsToChannel = (tags, channelId) => {
  Channel.findOneAndUpdate(
    { _id: channelId },
    { $addToSet: { hashtags: { $each: tags }}},
    { upsert: true, returnNewDocument: true },
  )
    .catch(err => console.error('unsuccessfully added hashtags to channel', err));
};

module.exports = {
  createVideo,
  getVideosFromHashtag,
};
