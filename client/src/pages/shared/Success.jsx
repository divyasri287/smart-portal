import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <CheckCircle2 className="w-16 h-16 text-emerald-600" />
      <h2 className="text-xl font-bold text-slate-900">Action Completed Successfully</h2>
      <p className="text-xs text-slate-500 max-w-md">
        Your procurement submission / slot request has been recorded in the central database.
      </p>
      <PrimaryButton onClick={() => navigate('/')}>Return to Home</PrimaryButton>
    </div>
  );
};

export default Success;
