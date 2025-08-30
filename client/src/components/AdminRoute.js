// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" />; // Redirect non-admins

  return children;
};

export default AdminRoute;