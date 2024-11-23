const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/user'); // Import your User model
require('dotenv').config();

const router = express.Router();

// Register Route
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('mobile').isMobilePhone().withMessage('Valid mobile number is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, mobile } = req.body;

    try {
      // Check if username or mobile already exists
      const existingUser = await User.findOne({ $or: [{ username }, { mobile }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or mobile number already in use' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        username,
        password: hashedPassword,
        mobile,
      });

      // Save the user to the database
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
);

// Login Route
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('mobile').isMobilePhone().withMessage('Valid mobile number is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, mobile } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ username, mobile });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username, password, or mobile number' });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username, password, or mobile number' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  }
);

module.exports = router;
