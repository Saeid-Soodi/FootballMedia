const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const User = require('../models/User');

// Getting one
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const team = await Team.findById(user.favoriteTeam);

    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post('/', async (req, res) => {
  try {
    const {
      teamName,
      teamFullName,
      nickName,
      founded,
      ground,
      league,
      aboutTeam,
      gallery,
      teamFormation,
      players,
      teamLogo,
    } = req.body;

    if (
      !teamName ||
      !teamFullName ||
      !nickName ||
      !founded ||
      !ground ||
      !league ||
      !aboutTeam ||
      !gallery ||
      !players ||
      !teamLogo ||
      !teamFormation
    ) {
      console.log(req.body);
      // handel if data is empty
      return res.status(400).json({ message: 'please enter valid data' });
    }

    const newTeam = await Team.create({
      teamName,
      teamFullName,
      nickName,
      founded,
      ground,
      league,
      aboutTeam,
      gallery,
      teamFormation,
      players,
      teamLogo,
    });

    res.status(201).json({ message: 'Team created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
