const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamLogo: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  teamFullName: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
  founded: {
    type: String,
    required: true,
  },
  ground: {
    type: String,
    required: true,
  },
  league: {
    type: String,
    required: true,
  },
  aboutTeam: {
    type: String,
    required: true,
  },
  players: {
    type: Array,
    required: true,
  },
  gallery: {
    type: Array,
    required: true,
  },
  teamFormation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Team', teamSchema);
