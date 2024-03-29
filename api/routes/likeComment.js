const express = require('express');
const router = express.Router();
const Tweets = require('../models/Tweets');

// Creating one
router.post('/', async (req, res) => {
  try {
    const { tweetId, userId, commentIndex } = req.body;

    if (!tweetId || !userId || !commentIndex) {
      // handel if data is empty
      return res.status(400).json({ message: 'please enter valid data' });
    }
    const tweet = await Tweets.findById(tweetId);
    //check if like exist
    if (tweet.comments[commentIndex].likes.includes(userId)) {
      tweet.comments[commentIndex].likes = tweet.comments[
        commentIndex
      ].likes.filter((id) => id !== userId);
      await tweet.save();

      return res.status(201).json({ message: 'Like removed for comment' });
    } else {
      tweet.comments[commentIndex].likes.push(userId);

      await tweet.save();

      return res.status(201).json({
        message: 'Like added for comment',
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
