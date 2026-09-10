import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OfficerDashboard from '../pages/officer/Dashboard';
import Queue from '../pages/officer/Queue';
import ScanQR from '../pages/officer/ScanQR';
import SearchFarmer from '../pages/officer/SearchFarmer';
import FarmerDetails from '../pages/officer/FarmerDetails';
import VerifyFarmer from '../pages/officer/VerifyFarmer';
import WeightCheck from '../pages/officer/WeightCheck';
import QualityCheck from '../pages/officer/QualityCheck';
import SubmitProcurement from '../pages/officer/SubmitProcurement';
import Receipt from '../pages/officer/Receipt';
import OfficerHistory from '../pages/officer/History';
import OfficerProfile from '../pages/officer/Profile';
import OfficerReports from '../pages/officer/Reports';
import ReportIssue from '../pages/officer/ReportIssue';

export const OfficerRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<OfficerDashboard />} />
      <Route path="queue" element={<Queue />} />
      <Route path="scan-qr" element={<ScanQR />} />
      <Route path="search-farmer" element={<SearchFarmer />} />
      <Route path="farmer-details/:id" element={<FarmerDetails />} />
      <Route path="verify-farmer/:id" element={<VerifyFarmer />} />
      <Route path="quality-check" element={<QualityCheck />} />
      <Route path="weight-check" element={<WeightCheck />} />
      <Route path="submit-procurement" element={<SubmitProcurement />} />
      <Route path="receipt/:id" element={<Receipt />} />
      <Route path="reports" element={<OfficerReports />} />
      <Route path="history" element={<OfficerHistory />} />
      <Route path="profile" element={<OfficerProfile />} />
      <Route path="report-issue" element={<ReportIssue />} />
    </Routes>
  );
};

export default OfficerRoutes;
