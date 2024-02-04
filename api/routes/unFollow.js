const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const cookie = require('cookie');

// authenticating
router.post('/', async (req, res) => {
  try {
    const { reqId, userId } = req.body;
    if (!reqId || !userId) {
      // handel if data is empty
      return res.status(400).json({ message: "Id's are invalid" });
    }

    const user = await User.findOne({ _id: userId });
    const reqUser = await User.findOne({ _id: reqId });
    if (!user.followings.includes(reqId)) {
      return res.status(400).json({
        message: `You have not follow user with ID: ${reqId}`,
      });
    }
    user.followings = user.followings.filter((id) => id !== req.body.reqId);
    reqUser.followers = reqUser.followers.filter(
      (id) => id !== req.body.userId
    );

    const updatedUser = await user.save();
    const updatedReqUser = await reqUser.save();

    res.status(200).json({ message: 'unFollowing set' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
