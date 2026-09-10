import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/select-role" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    switch (role) {
      case 'farmer':
        return <Navigate to="/farmer/dashboard" replace />;
      case 'officer':
        return <Navigate to="/officer/dashboard" replace />;
      case 'manager':
        return <Navigate to="/manager/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/select-role" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
