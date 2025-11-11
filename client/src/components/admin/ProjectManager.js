import React, { useState, useEffect } from 'react';
import { getAdminProjects, addProject, updateProject, deleteProject } from '../../services/adminService';
import ProjectForm from './ProjectForm'; // <-- 1. Import the new form
import './ProjectManager.css';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- NEW STATE FOR FORM ---
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null); // null for adding, project object for editing

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await getAdminProjects();
      setProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        loadProjects();
      } catch (err) {
        setError('Failed to delete project.');
      }
    }
  };

  // --- NEW HANDLER FUNCTIONS ---
  const handleAddClick = () => {
    setEditingProject(null); // Make sure we're not editing
    setIsFormVisible(true);
  };

  const handleEditClick = (project) => {
    setEditingProject(project); // Set the project to edit
    setIsFormVisible(true);
  };

  const handleFormSave = async (projectData) => {
    try {
      if (editingProject) {
        // We are editing an existing project
        await updateProject(editingProject._id, projectData);
      } else {
        // We are adding a new project
        await addProject(projectData);
      }
      loadProjects(); // Reload the list
      setIsFormVisible(false); // Hide the form
      setEditingProject(null); // Reset editing state
    } catch (err) {
      setError('Failed to save project.');
    }
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setEditingProject(null);
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="project-manager">
      <div className="pm-header">
        <h2>Manage Projects</h2>
        <button onClick={handleAddClick} className="add-new-btn">Add New Project</button>
      </div>

      {/* --- CONDITIONAL RENDERING FOR THE FORM --- */}
      {isFormVisible && (
        <ProjectForm
          project={editingProject}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}

      <div className="projects-list">
        {projects.map((project) => (
          <div key={project._id} className="project-list-item">
            <span className="project-title-admin">{project.title}</span>
            <div className="project-actions">
              <button onClick={() => handleEditClick(project)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(project._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;