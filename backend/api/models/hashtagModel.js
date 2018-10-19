const mongoose = require('mongoose');
const Video = require('./videoModel');

const HashtagSchema = mongoose.Schema({
  tag: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    minlength: 2,
    maxlength: 50,
  },
  videos: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Hashtag', HashtagSchema);
