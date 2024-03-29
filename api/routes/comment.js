const express = require('express');
const router = express.Router();
const Tweets = require('../models/Tweets');

// Creating one
router.post('/', async (req, res) => {
  try {
    const { tweetId, userId, userNameAndFamilyName, userName, commentContent } =
      req.body;

    if (
      !tweetId ||
      !userId ||
      !userNameAndFamilyName ||
      !userName ||
      !commentContent
    ) {
      // handel if data is empty
      return res.status(400).json({ message: 'please enter valid data' });
    }

    const tweet = await Tweets.findById(tweetId);
    tweet.comments.push({
      userId,
      userNameAndFamilyName,
      userName,
      commentContent,
    });

    await tweet.save();

    res.status(201).json({ message: 'Comment created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
