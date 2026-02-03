const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORRECTED CORS CONFIGURATION ---
const whitelist = ['http://localhost:3000', 'https://personal-portfolio-phi-beryl-12.vercel.app'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
// ------------------------------------

app.use(express.json());

// API Route Definitions
app.use('/api/public', require('./routes/publicRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// --- NEW ROBUST CONNECTION AND SERVER START ---
const startServer = async () => {
  try {
    // 1. Connect to the database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connection established successfully.');

    // 2. Start the Express server ONLY if the database connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running and listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer(); // Call the function to start the connection and server