import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 text-center">Reset Password</h2>
      <p className="text-xs text-slate-500 text-center">Enter your registered mobile or Aadhaar to receive OTP</p>

      <form onSubmit={(e) => { e.preventDefault(); navigate('/login'); }} className="space-y-3">
        <Input label="Registered Mobile / Aadhaar" placeholder="Enter mobile or Aadhaar" required />
        <PrimaryButton type="submit" className="w-full">Send Reset OTP</PrimaryButton>
        <SecondaryButton onClick={() => navigate('/login')} className="w-full">Back to Login</SecondaryButton>
      </form>
    </div>
  );
};

export default ForgotPassword;
