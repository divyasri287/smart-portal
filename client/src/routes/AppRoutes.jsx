import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../constants/roles';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import Loader from '../components/loader/Loader';

// Module Routes
const FarmerRoutes = lazy(() => import('./FarmerRoutes'));
const OfficerRoutes = lazy(() => import('./OfficerRoutes'));
const ManagerRoutes = lazy(() => import('./ManagerRoutes'));
const AdminRoutes = lazy(() => import('./AdminRoutes'));

// Auth Pages
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));

// Shared Status Screens
const Loading = lazy(() => import('../pages/shared/Loading'));
const Error = lazy(() => import('../pages/shared/Error'));
const Success = lazy(() => import('../pages/shared/Success'));
const NotFound = lazy(() => import('../pages/shared/NotFound'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Authentication Entry Points */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Dashboard Application Shell */}
        <Route element={<MainLayout />}>
          {/* Farmer Module Routes */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.FARMER]} />}>
            <Route path="/farmer/*" element={<FarmerRoutes />} />
          </Route>

          {/* Procurement Officer Module Routes */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.OFFICER]} />}>
            <Route path="/officer/*" element={<OfficerRoutes />} />
          </Route>

          {/* Centre Manager Module Routes */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.MANAGER]} />}>
            <Route path="/manager/*" element={<ManagerRoutes />} />
          </Route>

          {/* Government Admin Module Routes */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Route>

          {/* Shared Status Screens */}
          <Route path="/loading" element={<Loading />} />
          <Route path="/error" element={<Error />} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* Unknown routes redirect directly to Login Page */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
