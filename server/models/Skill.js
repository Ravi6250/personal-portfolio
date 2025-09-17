const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Programming Languages',
      'Frontend',
      'Backend',
      'Databases',
      'Developer Tools',
      'Core Concepts',
    ],
  },
});

module.exports = mongoose.model('Skill', SkillSchema);