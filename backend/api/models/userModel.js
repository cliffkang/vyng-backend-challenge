const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    minlength: 2,
    maxlength: 40,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
