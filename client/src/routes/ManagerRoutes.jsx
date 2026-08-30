import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ManagerDashboard from '../pages/manager/Dashboard';
import QueueMonitoring from '../pages/manager/QueueMonitoring';
import SlotManagement from '../pages/manager/SlotManagement';
import OfficerManagement from '../pages/manager/OfficerManagement';
import ManagerReports from '../pages/manager/Reports';
import Issues from '../pages/manager/Issues';
import ManagerAnalytics from '../pages/manager/Analytics';

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
      <Route path="analytics" element={<ManagerAnalytics />} />
    </Routes>
  );
};

export default ManagerRoutes;
