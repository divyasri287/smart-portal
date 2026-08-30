import React from 'react';
import { HelpCircle } from 'lucide-react';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <HelpCircle className="w-16 h-16 text-slate-400" />
      <h2 className="text-2xl font-bold text-slate-900">404 - Page Not Found</h2>
      <p className="text-xs text-slate-500 max-w-md">
        The requested URL does not exist or has been moved within the Smart Procurement Portal.
      </p>
      <PrimaryButton onClick={() => navigate('/')}>Go to Portal Home</PrimaryButton>
    </div>
  );
};

export default NotFound;
