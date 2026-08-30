import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';

export const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 text-center">Farmer Registration</h2>
      <p className="text-xs text-slate-500 text-center">Register your land holdings for MSP procurement</p>

      <form onSubmit={handleRegister} className="space-y-3">
        <Input label="Full Name (as on Aadhaar)" placeholder="e.g. Ramesh Singh" required />
        <Input label="Aadhaar Card Number" placeholder="12-digit Aadhaar number" required />
        <Input label="Mobile Number" placeholder="10-digit mobile number" required />
        <Input label="District & State" placeholder="e.g. Ludhiana, Punjab" required />

        <PrimaryButton type="submit" className="w-full">Submit Registration</PrimaryButton>
        <SecondaryButton onClick={() => navigate('/login')} className="w-full">
          Back to Login
        </SecondaryButton>
      </form>
    </div>
  );
};

export default Register;
