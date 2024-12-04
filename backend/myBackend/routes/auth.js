const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const User = require('../models/User'); // Your MongoDB User model
const router = express.Router(); // Create the router instance

// Initialize Firebase Admin SDK
const serviceAccount = require('../firebase-service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Login Route (for Username and Password)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error); // log the error
    res.status(500).json({ message: 'An error occurred during login. Please try again.', error: error.message });
  }
});


// Route to send OTP to user's phone number
router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required.' });
  }

  try {
    // Generate OTP via Firebase Authentication
    const verificationId = await admin.auth().createUser({
      phoneNumber: phoneNumber,
    });

    // Generate a verification ID (this step would be handled client-side in actual use)
    // Firebase Admin SDK doesn't support directly sending OTP, so this should be managed by client-side Firebase SDK.
    res.status(200).json({
      message: 'OTP sent successfully. Use the verificationId on the client side.',
      verificationId,
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      message: 'Failed to send OTP.',
      error: error.message,
    });
  }
});

// Route to verify the OTP entered by the user
router.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otpCode, verificationId } = req.body;

  if (!phoneNumber || !otpCode || !verificationId) {
    return res.status(400).json({ message: 'Missing required parameters.' });
  }

  try {
    // This should be done client-side using the Firebase JS SDK to confirm the OTP entered by the user.
    // Firebase Admin SDK does not have direct methods to verify OTP, this step must be done client-side
    const credential = admin.auth.PhoneAuthProvider.credential(verificationId, otpCode);
    const userCredential = await admin.auth().signInWithCredential(credential);

    // OTP is valid, user is authenticated
    res.status(200).json({ message: 'OTP verification successful.', user: userCredential.user });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP.', error: error.message });
  }
});

// Register Route (for user signup)
router.post('/register', async (req, res) => {
  const { username, password, mobile } = req.body;

  // Basic validation
  if (!username || !password || !mobile) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or mobile number already in use' });
    }

    // Hash the password before saving to MongoDB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in MongoDB
    const newUser = new User({
      username,
      password: hashedPassword,
      mobile,
    });

    // Save the user to MongoDB
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Export the router
module.exports = router;
