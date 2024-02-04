const express = require('express');
const router = express.Router();
const cookie = require('cookie');

// kill cookie
router.get('/', async (req, res) => {
  try {
    res
      .status(200)
      .setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
          httpOnly: true,
          maxAge: 0,
          path: '/',
          sameSite: 'none',
          secure: true,
        })
      )
      .json({ message: 'Logged Out!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
