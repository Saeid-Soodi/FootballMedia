const mongoose = require('mongoose');

const footballLeagueSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  goals: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('FootballLeague', footballLeagueSchema);
