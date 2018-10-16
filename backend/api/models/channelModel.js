const mongoose = require('mongoose');
const User = require('./userModel');

const ChannelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    minlength: 2,
    maxlength: 50,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
}, { timestamps: true });

module.exports = mongoose.Model('Channel', ChannelSchema);
