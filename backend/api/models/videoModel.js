const mongoose = require('mongoose');
require('mongoose-type-url');
const Channel = require('./channelModel');

const VideoSchema = mongoose.Schema({
  youtubeId: {
    type: String,
    required: true,
  },
  url: {
    type: mongoose.SchemaTypes.Url,
    required: true,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Channel,
  },
  hashtags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
