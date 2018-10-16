const Video = require('../models/videoModel');

const createVideo = (req, res) => {
  const { url, channel } = req.body;
  if (url && channel) {
    const newVideo = new Video({ url, channel });
    newVideo.save()
      .then(video => res.status(201).send('video successfully saved', video))
      .catch(err => res.status(422).send('error saving video', err));
  } else {
    res.status(400).send('missing a url and/or a channel');
  }
};

module.exports = {
  createVideo,
};
