// /config/db.js
const mongoose = require('mongoose');
require('dotenv').config();  // To load environment variables from .env file

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI;
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
