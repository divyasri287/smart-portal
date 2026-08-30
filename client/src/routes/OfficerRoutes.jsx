import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OfficerDashboard from '../pages/officer/Dashboard';
import Queue from '../pages/officer/Queue';
import ScanQR from '../pages/officer/ScanQR';
import SearchFarmer from '../pages/officer/SearchFarmer';
import FarmerDetails from '../pages/officer/FarmerDetails';
import WeightCheck from '../pages/officer/WeightCheck';
import QualityCheck from '../pages/officer/QualityCheck';
import SubmitProcurement from '../pages/officer/SubmitProcurement';
import Receipt from '../pages/officer/Receipt';
import OfficerHistory from '../pages/officer/History';

export const OfficerRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<OfficerDashboard />} />
      <Route path="queue" element={<Queue />} />
      <Route path="scan-qr" element={<ScanQR />} />
      <Route path="search-farmer" element={<SearchFarmer />} />
      <Route path="farmer-details/:id" element={<FarmerDetails />} />
      <Route path="weight-check" element={<WeightCheck />} />
      <Route path="quality-check" element={<QualityCheck />} />
      <Route path="submit-procurement" element={<SubmitProcurement />} />
      <Route path="receipt/:id" element={<Receipt />} />
      <Route path="history" element={<OfficerHistory />} />
    </Routes>
  );
};

export default OfficerRoutes;
