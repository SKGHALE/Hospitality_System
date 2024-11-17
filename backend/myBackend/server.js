const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // Parses incoming JSON requests

// Sample API endpoint
app.get('/api/landing', (req, res) => {
  res.json({ message: 'Welcome To The Landing Page!' });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
