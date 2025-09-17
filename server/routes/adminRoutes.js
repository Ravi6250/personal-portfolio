const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Import models
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const About = require('../models/About');
const Message = require('../models/Message');

// Apply the authMiddleware to all routes in this file.
router.use(authMiddleware);

// =============================================================================
//  PROJECT ROUTES (CRUD)
// =============================================================================

// @route   GET /api/admin/projects
// @desc    Get all projects for the admin panel
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/admin/projects
// @desc    Add a new project
router.post('/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const project = await newProject.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/admin/projects/:id
// @desc    Update a project
router.put('/projects/:id', async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    project = await Project.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/admin/projects/:id
// @desc    Delete a project
router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    await project.deleteOne();
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// =============================================================================
//  ABOUT ME ROUTES
// =============================================================================

// @route   GET /api/admin/about
// @desc    Get "About Me" content for the admin editor
router.get('/about', async (req, res) => {
  try {
    const aboutContent = await About.findOne();
    // It's okay if aboutContent is null (e.g., first time running)
    res.json(aboutContent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/admin/about
// @desc    Update "About Me" content
router.put('/about', async (req, res) => {
  try {
    const updatedAbout = await About.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
    res.json(updatedAbout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// =============================================================================
//  MESSAGES ROUTE
// =============================================================================

// @route   GET /api/admin/messages
// @desc    Get all contact messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;