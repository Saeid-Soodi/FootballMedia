const mongoose = require('mongoose');

const twitsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userNameAndFamilyName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  tweetContent: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

module.exports = mongoose.model('Tweets', twitsSchema);
