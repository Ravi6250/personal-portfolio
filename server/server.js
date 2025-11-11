const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

ocked.

const allowedOrigins = [
  'http://localhost:3000',                            // For local development
  'https://personal-portfolio-phi-beryl-12.vercel.app'  // Your live Vercel frontend URL
];

const corsOptions = {
  origin: function (origin, callback) {
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      
      callback(null, true);
    } else {
      // If the origin is not in our list, we block the request.
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));


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