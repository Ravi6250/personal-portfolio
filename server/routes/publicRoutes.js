const express = require('express');
const router = express.Router();

// Import your Mongoose models
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const About = require('../models/About');
const Message = require('../models/Message');

// --- PUBLIC GET ROUTES ---

// @route   GET /api/public/about
// @desc    Get the "About Me" content
router.get('/about', async (req, res) => {
  try {
    // We assume there is only one "about" document
    const aboutContent = await About.findOne();
    res.json(aboutContent);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/public/projects
// @desc    Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }); // Show newest first
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/public/skills
// @desc    Get all skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// --- CONTACT FORM ROUTE ---

// @route   POST /api/public/contact
// @desc    Submit a contact form message
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  try {
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;