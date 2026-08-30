import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import FarmerLayout from '../layouts/FarmerLayout';
import OfficerLayout from '../layouts/OfficerLayout';
import ManagerLayout from '../layouts/ManagerLayout';
import AdminLayout from '../layouts/AdminLayout';

// Module Routes
import FarmerRoutes from './FarmerRoutes';
import OfficerRoutes from './OfficerRoutes';
import ManagerRoutes from './ManagerRoutes';
import AdminRoutes from './AdminRoutes';

// Pages
import LandingPage from '../pages/landing/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Shared Pages
import Loading from '../pages/shared/Loading';
import Error from '../pages/shared/Error';
import Success from '../pages/shared/Success';
import NotFound from '../pages/shared/NotFound';
import ComingSoon from '../pages/shared/ComingSoon';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Main Application Shell with Shared Navbar, Sidebar, and Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />

        {/* Farmer Module Routes (Member 1) */}
        <Route path="/farmer/*" element={<FarmerRoutes />} />

        {/* Officer Module Routes (Member 2) */}
        <Route path="/officer/*" element={<OfficerRoutes />} />

        {/* Manager Module Routes (Member 3) */}
        <Route path="/manager/*" element={<ManagerRoutes />} />

        {/* Admin Module Routes (Member 4) */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Shared Pages */}
        <Route path="/loading" element={<Loading />} />
        <Route path="/error" element={<Error />} />
        <Route path="/success" element={<Success />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
