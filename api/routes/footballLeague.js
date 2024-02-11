const express = require('express');
const router = express.Router();
const FootballLeague = require('../models/FootballLeague');

// Getting all
router.get('/', async (req, res) => {
  try {
    const list = await FootballLeague.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post('/', async (req, res) => {
  try {
    const { teamName, points, goals } = req.body;

    if (!teamName || !points || !goals) {
      // handel if data is empty
      return res.status(400).json({ message: 'please enter valid data' });
    }

    const newFootballLeague = await FootballLeague.create({
      teamName,
      points,
      goals,
    });

    res.status(201).json({ message: 'FootballLeague item created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch('/:id', async (req, res) => {
  try {
    const footballLeagueItem = await FootballLeague.findById(req.params.id);
    if (!footballLeagueItem) {
      return res.status(404).json({ message: 'footballLeagueItem not found' });
    }

    // Update fields based on request body
    if (req.body.teamName) {
      footballLeagueItem.teamName = req.body.teamName;
    }
    if (req.body.points) {
      footballLeagueItem.points = req.body.points;
    }
    if (req.body.goals) {
      footballLeagueItem.goals = req.body.goals;
    }

    await footballLeagueItem.save();
    res.status(201).json({ message: 'footballLeagueItem Updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
