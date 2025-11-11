import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Import Layouts
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Import Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/admin/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';

import './App.css';

// 1. PUBLIC LAYOUT COMPONENT
// This component wraps all the public pages and includes the main Navbar.
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet /> {/* Child routes (Home, About, etc.) will render here */}
      </main>
    </>
  );
};

// 2. ADMIN LAYOUT COMPONENT (currently simple)
// This component wraps all protected admin pages.
// It uses the ProtectedRoute to secure its children.
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* A separate Admin Navbar could go here in the future */}
      <ProtectedRoute>
        <Outlet /> {/* AdminDashboard will render here */}
      </ProtectedRoute>
    </div>
  );
};


// 3. MAIN APP COMPONENT WITH NEW ROUTING
function App() {
  return (
    <Router>
      <Routes>
        {/* Routes for the Public Website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Route for the Admin Login Page (has no layout) */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Routes for the Protected Admin Panel */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* Add more protected admin routes here later */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;