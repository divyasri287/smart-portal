import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FarmerDashboard from '../pages/farmer/Dashboard';
import BookSlot from '../pages/farmer/BookSlot';
import Token from '../pages/farmer/Token';
import ProcurementStatus from '../pages/farmer/ProcurementStatus';
import PaymentStatus from '../pages/farmer/PaymentStatus';
import History from '../pages/farmer/History';
import Help from '../pages/farmer/Help';
import Profile from '../pages/farmer/Profile';

export const FarmerRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<FarmerDashboard />} />
      <Route path="book-slot" element={<BookSlot />} />
      <Route path="token" element={<Token />} />
      <Route path="procurement-status" element={<ProcurementStatus />} />
      <Route path="payment-status" element={<PaymentStatus />} />
      <Route path="history" element={<History />} />
      <Route path="help" element={<Help />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};

export default FarmerRoutes;
