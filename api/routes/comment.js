const express = require('express');
const router = express.Router();
const Tweets = require('../models/Tweets');

// Getting one
router.get('/:id', async (req, res) => {
  try {
    const tweets = await Tweets.find();
    res.json(tweets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
      dateTime: new Date(),
    });

    await tweet.save();

    res.status(201).json({ message: 'Comment created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
