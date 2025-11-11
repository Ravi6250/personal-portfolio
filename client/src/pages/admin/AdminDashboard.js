import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectManager from '../../components/admin/ProjectManager';
import MessageViewer from '../../components/admin/MessageViewer';
import AboutEditor from '../../components/admin/AboutEditor';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      <div className="dashboard-content">
        <ProjectManager />
        <MessageViewer />
        <AboutEditor />
      </div>
    </div>
  );
};

export default AdminDashboard;