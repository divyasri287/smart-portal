import React from 'react';
import { AlertTriangle } from 'lucide-react';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <AlertTriangle className="w-16 h-16 text-rose-600" />
      <h2 className="text-xl font-bold text-slate-900">An Error Occurred</h2>
      <p className="text-xs text-slate-500 max-w-md">
        We encountered an issue processing your request. Please retry or contact Mandi Support.
      </p>
      <PrimaryButton onClick={() => navigate(-1)}>Return Back</PrimaryButton>
    </div>
  );
};

export default Error;
