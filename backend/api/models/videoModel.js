const mongoose = require('mongoose');
require('mongoose-type-url');
const Channel = require('./channelModel');

const VideoSchema = mongoose.Schema({
  url: {
    type: mongoose.SchemaTypes.Url,
    required: true,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Channel,
  },
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
