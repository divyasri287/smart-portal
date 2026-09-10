import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../constants/roles';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import Loader from '../components/loader/Loader';

// Auth Pages
const RoleSelection  = lazy(() => import('../pages/auth/RoleSelection'));
const Login          = lazy(() => import('../pages/auth/Login'));
const Register       = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));

// Module Routes (lazy)
const FarmerRoutes  = lazy(() => import('./FarmerRoutes'));
const OfficerRoutes = lazy(() => import('./OfficerRoutes'));
const ManagerRoutes = lazy(() => import('./ManagerRoutes'));
const AdminRoutes   = lazy(() => import('./AdminRoutes'));

// Shared Screens
const Loading  = lazy(() => import('../pages/shared/Loading'));
const Error    = lazy(() => import('../pages/shared/Error'));
const Success  = lazy(() => import('../pages/shared/Success'));
const NotFound = lazy(() => import('../pages/shared/NotFound'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ── Public Auth Routes ── */}
        <Route element={<AuthLayout />}>
          {/* Root → Role Selection */}
          <Route path="/"             element={<Navigate to="/select-role" replace />} />
          <Route path="/select-role"  element={<RoleSelection />} />
          <Route path="/login"        element={<Navigate to="/select-role" replace />} />
          <Route path="/login/:roleId"       element={<Login />} />
          <Route path="/register"            element={<Navigate to="/register/farmer" replace />} />
          <Route path="/register/:roleId"    element={<Register />} />
          <Route path="/forgot-password"     element={<ForgotPassword />} />
        </Route>

        {/* ── Protected Dashboard Routes ── */}
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute allowedRoles={[ROLES.FARMER]} />}>
            <Route path="/farmer/*" element={<FarmerRoutes />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[ROLES.OFFICER]} />}>
            <Route path="/officer/*" element={<OfficerRoutes />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[ROLES.MANAGER]} />}>
            <Route path="/manager/*" element={<ManagerRoutes />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Route>

          <Route path="/loading" element={<Loading />} />
          <Route path="/error"   element={<Error />} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/select-role" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
