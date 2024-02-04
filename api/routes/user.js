const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

// Getting all
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// function for hashing password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

// Creating one
router.post('/', async (req, res) => {
  try {
    const {
      name,
      familyName,
      userName,
      email,
      birthDate,
      pass,
      gender,
      phone,
      bio,
    } = req.body;

    if (
      !name ||
      !familyName ||
      !userName ||
      !email ||
      !birthDate ||
      !pass ||
      !gender ||
      !bio ||
      !phone
    ) {
      // handel if data is empty
      return res.status(400).json({ message: 'please enter valid data' });
    }

    const existingEmail = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone });
    if (existingEmail) {
      return res.status(400).json({ message: 'user already exist' });
    }
    if (existingPhone) {
      return res.status(400).json({ message: 'user already exist' });
    }

    const hashPass = await hashPassword(pass);

    const newUser = await User.create({
      name,
      familyName,
      userName,
      email,
      birthDate,
      pass: hashPass,
      gender,
      phone,
      bio,
    });

    res.status(201).json({ message: 'user created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    // Update fields based on request body
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.familyName) {
      user.familyName = req.body.familyName;
    }
    if (req.body.userName) {
      user.userName = req.body.userName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.bio) {
      user.bio = req.body.bio;
    }
    if (req.body.birthDate) {
      user.birthDate = req.body.birthDate;
    }
    if (req.body.pass) {
      const hashPass = await hashPassword(req.body.pass);
      user.pass = hashPass;
    }
    if (req.body.gender) {
      user.gender = req.body.gender;
    }
    if (req.body.phone) {
      user.phone = req.body.phone;
    }
    if (req.body.favoriteTeam) {
      user.favoriteTeam = req.body.favoriteTeam;
    }
    if (req.body.followingId) {
      // Check if the followingId is already in the followers array
      if (user.followings.includes(req.body.followingId)) {
        // If already following, send a message indicating that
        return res.status(400).json({
          message: `You are already following user with ID: ${req.body.followingId}`,
        });
      } // If not, add it to the followers array
      user.followings.push(req.body.followingId);
    }
    if (req.body.followers) {
      user.followers.push(req.body.followers);
    }
    if (req.body.unFollowingId) {
      // Assuming req.body.unfollowingId is the ID to unfollow
      user.followings = user.followings.filter(
        (id) => id !== req.body.unFollowingId
      );
    }
    if (req.body.role) {
      user.role = req.body.role;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
