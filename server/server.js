const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- CORRECTED CORS CONFIGURATION ---
// Whitelist of allowed origins (URLs that can make API requests)
const whitelist = ['http://localhost:3000', 'https://personal-portfolio-phi-beryl-12.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if the incoming origin is in our whitelist
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
};

// Use the CORS middleware with our options
app.use(cors(corsOptions));
// ------------------------------------

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Database Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connection established successfully.');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// API Route Definitions
app.use('/api/public', require('./routes/publicRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Server Port and Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});