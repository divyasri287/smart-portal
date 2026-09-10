import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ManagerDashboard from '../pages/manager/Dashboard';
import QueueMonitoring from '../pages/manager/QueueMonitoring';
import SlotManagement from '../pages/manager/SlotManagement';
import OfficerManagement from '../pages/manager/OfficerManagement';
import ManagerReports from '../pages/manager/Reports';
import Issues from '../pages/manager/Issues';
import Notifications from '../pages/manager/Notifications';
import Profile from '../pages/manager/Profile';

export const ManagerRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<ManagerDashboard />} />
      <Route path="queue-monitoring" element={<QueueMonitoring />} />
      <Route path="slot-management" element={<SlotManagement />} />
      <Route path="officer-management" element={<OfficerManagement />} />
      <Route path="reports" element={<ManagerReports />} />
      <Route path="issues" element={<Issues />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="profile" element={<Profile />} />
      {/* Redirect removed analytics to dashboard */}
      <Route path="analytics" element={<Navigate to="dashboard" replace />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default ManagerRoutes;
