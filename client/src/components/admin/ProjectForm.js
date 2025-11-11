import React, { useState, useEffect } from 'react';
import './ProjectForm.css';

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techUsed: '', // We'll handle this as a comma-separated string
    liveLink: '',
    githubLink: '',
  });

  // If we are editing a project, populate the form with its data
  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        techUsed: project.techUsed.join(', '), // Convert array to string
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert the techUsed string back to an array
    const finalData = {
      ...formData,
      techUsed: formData.techUsed.split(',').map(tech => tech.trim()),
    };
    onSave(finalData);
  };

  return (
    <div className="project-form-modal">
      <div className="form-content">
        <h2>{project ? 'Edit Project' : 'Add New Project'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Tech Used (comma-separated)</label>
            <input type="text" name="techUsed" value={formData.techUsed} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Live Link</label>
            <input type="text" name="liveLink" value={formData.liveLink} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>GitHub Link</label>
            <input type="text" name="githubLink" value={formData.githubLink} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
