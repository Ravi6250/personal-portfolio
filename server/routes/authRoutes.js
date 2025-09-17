const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// NOTE: You should have a separate, secure way to create the first admin user.
// This could be a script or a one-time registration route. For simplicity,
// we assume an admin user already exists in the database.

// @route   POST /api/auth/login
// @desc    Authenticate admin and get token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 2. Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Create JWT Payload
    const payload = {
      user: {
        id: user.id, // Include user ID in the token
      },
    };

    // 4. Sign the token and send it back
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Token expires in 5 hours
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;