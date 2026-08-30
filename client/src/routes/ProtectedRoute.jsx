import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { role } = useAuth();

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // For easy testing in development/hackathon demo, allow preview or redirect to login
    return <Outlet />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
