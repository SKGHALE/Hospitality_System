const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const admin = require("../firebase/firebaseAdmin"); // Firebase Admin SDK
const User = require("../models/user"); // MongoDB User Model

const router = express.Router();

// Register Route (MongoDB for storing user data)
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("mobile").isMobilePhone().withMessage("Valid mobile number is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, mobile } = req.body;

    try {
      // Check if username or mobile already exists in MongoDB
      const existingUser = await User.findOne({ $or: [{ username }, { mobile }] });
      if (existingUser) {
        return res.status(400).json({ message: "Username or mobile number already in use" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user in MongoDB
      const newUser = new User({
        username,
        password: hashedPassword,
        mobile,
      });

      // Save the user to MongoDB
      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Server error during registration" });
    }
  }
);

// Login Route (MongoDB for user credential validation and JWT generation)
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Authenticate user from MongoDB using username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }

      // Verify the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }

      // Generate JWT token for session management
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Send the token for OTP verification
      res.status(200).json({
        message: "Login successful. Please verify your phone number via OTP.",
        token, // JWT token for session validation
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Server error during login" });
    }
  }
);

// OTP Verification Route (Firebase Admin for verifying OTP)
router.post("/verify-otp", async (req, res) => {
  const { otpToken, phoneNumber } = req.body;

  if (!otpToken || !phoneNumber) {
    return res.status(400).json({ message: "OTP token and phone number are required." });
  }

  try {
    // Verify the Firebase ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(otpToken);

    // Check if phone number matches
    if (decodedToken.phone_number !== phoneNumber) {
      return res.status(400).json({ message: "Invalid OTP or phone number." });
    }

    // OTP successfully verified
    res.status(200).json({ message: "Phone number verified successfully!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP." });
  }
});

// OTP Sending Route (To be done in client-side, just an API placeholder)
router.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  try {
    // Firebase OTP sending should be done client-side
    res.status(200).json({
      message: "OTP sending should be handled in the client-side.",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP." });
  }
});

module.exports = router;
