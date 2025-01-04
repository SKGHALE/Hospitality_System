const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET; // Get the secret key from .env

// Generate JWT token
function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
