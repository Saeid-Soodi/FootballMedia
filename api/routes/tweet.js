const express = require('express');
const router = express.Router();
const Tweets = require('../models/Tweets');

// Getting all
router.get('/', async (req, res) => {
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
    const { userId, userNameAndFamilyName, userName, tweetContent } = req.body;

    if (!userId || !userNameAndFamilyName || !userName || !tweetContent) {
      // handel if data is empty
      return res.status(400).json({ message: 'please enter valid data' });
    }

    const newTweet = await Tweets.create({
      userId,
      userNameAndFamilyName,
      userName,
      tweetContent,
    });

    res.status(201).json({ message: 'Tweet created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
