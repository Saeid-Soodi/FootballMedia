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

// Updating One
router.patch('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'team not found' });
    }

    // Update fields based on request body
    if (req.body.teamLogo) {
      team.teamLogo = req.body.teamLogo;
    }
    if (req.body.teamName) {
      team.teamName = req.body.teamName;
    }
    if (req.body.teamFullName) {
      team.teamFullName = req.body.teamFullName;
    }
    if (req.body.nickName) {
      team.nickName = req.body.nickName;
    }
    if (req.body.founded) {
      team.founded = req.body.founded;
    }
    if (req.body.ground) {
      team.ground = req.body.ground;
    }
    if (req.body.league) {
      team.league = req.body.league;
    }
    if (req.body.aboutTeam) {
      team.aboutTeam = req.body.aboutTeam;
    }
    if (req.body.players) {
      team.players = req.body.players;
    }
    if (req.body.gallery) {
      team.gallery = req.body.gallery;
    }
    if (req.body.teamFormation) {
      team.teamFormation = req.body.teamFormation;
    }

    const updatedTeam = await team.save();
    res.json(updatedTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
