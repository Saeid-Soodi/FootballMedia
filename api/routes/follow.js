const express = require('express');
const router = express.Router();
const User = require('../models/User');

// authenticating
router.post('/', async (req, res) => {
  try {
    const { reqId, userId } = req.body;
    if (!reqId || !userId) {
      // handel if data is empty
      return res.status(400).json({ message: "Id's are invalid" });
    }

    if (reqId === userId) {
      return res.status(400).json({ message: 'you can not unFollow yourself' });
    }

    const user = await User.findOne({ _id: userId });
    const reqUser = await User.findOne({ _id: reqId });
    if (user.followings.includes(reqId)) {
      // If already following, send a message indicating that
      return res.status(400).json({
        message: `You are already following user with ID: ${reqId}`,
      });
    } // If not, add it to the followers array
    user.followings.push(req.body.reqId);
    reqUser.followers.push(req.body.userId);
    const updatedUser = await user.save();
    const updatedReqUser = await reqUser.save();

    res.status(200).json({ message: 'Following set' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
