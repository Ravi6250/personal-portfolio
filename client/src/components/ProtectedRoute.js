import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check for the token in localStorage
  const token = localStorage.getItem('token');

  // If a token exists, the user is authenticated.
  // The <Outlet /> component will render the child route (e.g., AdminDashboard).
  if (token) {
    return <Outlet />;
  }

  // If no token exists, redirect the user to the login page.
  // The `replace` prop is used to prevent the user from going "back" to the protected page.
  return <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;