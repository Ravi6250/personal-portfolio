const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techUsed: [String],
  liveLink: String,
  githubLink: String
});
module.exports = mongoose.model('Project', ProjectSchema);