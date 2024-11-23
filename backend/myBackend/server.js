const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // To load environment variables from .env file

const app = express();

// Middleware
app.use(cors());  // Enables cross-origin requests
app.use(express.json());  // Parses incoming JSON requests

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));  // Import and use authentication routes

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
