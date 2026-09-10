import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/admin/Dashboard';
import StateAnalytics from '../pages/admin/StateAnalytics';
import DistrictAnalytics from '../pages/admin/DistrictAnalytics';
import CentreMonitoring from '../pages/admin/CentreMonitoring';
import Users from '../pages/admin/Users';
import AdminPayments from '../pages/admin/Payments';
import AdminReports from '../pages/admin/Reports';
import Notifications from '../pages/admin/Notifications';
import Profile from '../pages/admin/Profile';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="state-analytics" element={<StateAnalytics />} />
      <Route path="district-analytics" element={<DistrictAnalytics />} />
      <Route path="centre-monitoring" element={<CentreMonitoring />} />
      <Route path="users" element={<Users />} />
      <Route path="payments" element={<AdminPayments />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
