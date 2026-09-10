import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { ArrowLeft, KeyRound, PhoneCall, CheckCircle } from 'lucide-react';
import { useToastContext } from '../../context/ToastContext';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { addToast } = useToastContext();
  const [identifier, setIdentifier] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setResetSubmitted(true);
    if (addToast) addToast('Password reset instructions sent to official registered email/mobile.', 'success');
  };

  return (
    <div className="space-y-5 max-w-lg mx-auto select-none cursor-default">
      <button
        type="button"
        onClick={() => navigate('/select-role')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-800 transition-colors cursor-pointer select-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Role Selection</span>
      </button>

      <div className="bg-emerald-800 text-white p-5 rounded-2xl shadow-sm border border-emerald-700 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider block">Security &amp; Access Recovery</span>
          <h1 className="text-2xl font-black tracking-tight">Password Reset Assistance</h1>
          <p className="text-xs text-emerald-100 mt-0.5">Government Procurement Portal Account Support</p>
        </div>
        <div className="p-3 bg-white/10 rounded-xl">
          <KeyRound className="w-8 h-8 text-white" />
        </div>
      </div>

      {!resetSubmitted ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <Input
            label="Officer ID / Manager ID / Admin ID / Registered Email"
            placeholder="e.g. OFF001, MGR001, ADM001"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <div className="flex gap-2 pt-2">
            <SecondaryButton type="button" onClick={() => navigate('/select-role')} className="w-1/3">
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" className="w-2/3 py-2.5">
              Request Reset Link
            </PrimaryButton>
          </div>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Recovery Instructions Sent</h2>
          <p className="text-xs text-slate-600">
            Password reset instructions have been dispatched to the contact details linked to <b>{identifier}</b>.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-700" />
            <span>Support Helpline: <b>1800-180-1551</b></span>
          </div>
          <PrimaryButton onClick={() => navigate('/select-role')} className="w-full">
            Return to Role Selection
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
