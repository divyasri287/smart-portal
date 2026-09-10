import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToastContext } from '../../context/ToastContext';
import { ROLES } from '../../constants/roles';
import Input from '../../components/inputs/Input';
import Dropdown from '../../components/inputs/Dropdown';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { ArrowLeft, UserPlus, Lock, X } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const { roleId } = useParams();
  const { registerUser } = useAuth();
  const { addToast } = useToastContext();

  const activeRole = (roleId || ROLES.FARMER).toLowerCase();

  const [formData, setFormData] = useState({
    fullName: '', mobile: '', aadhaar: '', dob: '', gender: 'Male',
    address: '', state: 'Punjab', district: 'Ludhiana', taluk: 'Samrala',
    village: 'Samrala', pinCode: '141114',
    centre: 'Ludhiana Mandi Centre 4', primaryCrop: 'Paddy (Dhan)',
    accountHolderName: '', accountNumber: '', ifscCode: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP Modal
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleInitiateRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.fullName.trim())                                      return setErrorMsg('Full Name is required.');
    if (!/^[6-9]\d{9}$/.test(formData.mobile.trim()))                  return setErrorMsg('Please enter a valid 10-digit Mobile Number.');
    if (!/^\d{12}$/.test(formData.aadhaar.trim()))                      return setErrorMsg('Please enter a valid 12-digit Aadhaar Number.');
    if (!formData.dob)                                                   return setErrorMsg('Date of Birth is required.');
    if (!formData.address.trim())                                        return setErrorMsg('Address is required.');
    if (!formData.state || !formData.district || !formData.pinCode)     return setErrorMsg('Please complete State, District, and PIN Code.');
    if (!formData.centre)                                                return setErrorMsg('Please select your preferred procurement centre.');
    if (!formData.primaryCrop)                                           return setErrorMsg('Please select your primary crop.');
    if (!formData.accountHolderName || !formData.accountNumber || !formData.ifscCode)
      return setErrorMsg('Please complete all Bank Details.');

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setEnteredOtp(code);
    setShowOtpModal(true);
    if (addToast) addToast(`OTP generated for ${formData.mobile}: ${code}`, 'info');
  };

  const handleVerifyOtpAndSave = () => {
    setOtpError('');
    if (!enteredOtp || enteredOtp.trim() !== generatedOtp.trim())
      return setOtpError('Invalid OTP. Please verify the code.');

    setIsSubmitting(true);
    setTimeout(() => {
      const record = {
        id: 'FRM-' + Math.floor(1000 + Math.random() * 9000),
        ...formData,
        name: formData.fullName,
        role: ROLES.FARMER,
        registeredAt: new Date().toISOString(),
      };
      registerUser(ROLES.FARMER, record, false);
      setIsSubmitting(false);
      setShowOtpModal(false);
      if (addToast) addToast('Registration Successful! Redirecting to Farmer Login...', 'success');
      navigate('/login/farmer');
    }, 600);
  };

  // Non-farmer roles are provisioned by admin
  if (activeRole !== ROLES.FARMER) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4 select-none">
        <div className="p-3 bg-amber-100 text-amber-800 rounded-full w-12 h-12 mx-auto flex items-center justify-center font-bold text-lg">!</div>
        <h2 className="text-lg font-bold text-slate-900">Registration Restricted</h2>
        <p className="text-xs text-slate-600">
          Self-registration is only available for <b>Farmers</b>. Officers, Managers, and Admins are provisioned by system administrators.
        </p>
        <PrimaryButton onClick={() => navigate(`/login/${activeRole}`)} className="w-full">
          Go to {activeRole.toUpperCase()} Login Page
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl mx-auto select-none cursor-default">
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/login/farmer')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-800 transition-colors cursor-pointer select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Farmer Login</span>
        </button>
        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-200">
          MSP Farmer Onboarding
        </span>
      </div>

      {/* Header Card */}
      <div className="bg-emerald-800 text-white p-6 rounded-2xl shadow-sm border border-emerald-700 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider block">Government MSP Portal</span>
          <h1 className="text-2xl font-black tracking-tight">Farmer Registration</h1>
          <p className="text-xs text-emerald-100 mt-1">Register to sell agricultural produce under Government Minimum Support Price (MSP)</p>
        </div>
        <div className="p-3.5 bg-white/10 rounded-2xl">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleInitiateRegister} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">

        {/* Section 1: Personal Details */}
        <div className="space-y-4">
          <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Personal Details
            </h2>
            <span className="text-[11px] text-slate-500 font-medium">* Mandatory Fields</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name (as on Aadhaar)" placeholder="e.g. Gurpreet Singh" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} required />
            <Input label="Mobile Number" placeholder="10-digit mobile number" value={formData.mobile} onChange={(e) => handleChange('mobile', e.target.value.replace(/\D/g, ''))} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Aadhaar Number" placeholder="12-digit Aadhaar" value={formData.aadhaar} onChange={(e) => handleChange('aadhaar', e.target.value.replace(/\D/g, ''))} required />
            <Input label="Date of Birth" type="date" value={formData.dob} onChange={(e) => handleChange('dob', e.target.value)} required />
            <Dropdown label="Gender" value={formData.gender} onChange={(e) => handleChange('gender', e.target.value)}
              options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }]} required />
          </div>
          <Input label="Address (House/Street/Locality)" placeholder="Enter complete residential address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} required />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <Input label="State" placeholder="State" value={formData.state} onChange={(e) => handleChange('state', e.target.value)} required />
            <Input label="District" placeholder="District" value={formData.district} onChange={(e) => handleChange('district', e.target.value)} required />
            <Input label="Taluk / Tehsil" placeholder="Taluk" value={formData.taluk} onChange={(e) => handleChange('taluk', e.target.value)} required />
            <Input label="Village" placeholder="Village" value={formData.village} onChange={(e) => handleChange('village', e.target.value)} required />
            <Input label="PIN Code" placeholder="6-digit PIN" value={formData.pinCode} onChange={(e) => handleChange('pinCode', e.target.value.replace(/\D/g, ''))} required />
          </div>
        </div>

        {/* Section 2: Farming Details */}
        <div className="space-y-4 pt-2">
          <div className="pb-2 border-b border-slate-200">
            <h2 className="text-sm font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Farming Details
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Dropdown label="Preferred Procurement Centre" value={formData.centre} onChange={(e) => handleChange('centre', e.target.value)}
              options={[
                { label: 'Ludhiana Mandi Centre 4', value: 'Ludhiana Mandi Centre 4' },
                { label: 'Patiala Grains Yard', value: 'Patiala Grains Yard' },
                { label: 'Sangrur Procurement Hub', value: 'Sangrur Procurement Hub' },
                { label: 'Salem Main Yard', value: 'Salem Main Yard' },
              ]} required />
            <Dropdown label="Primary Crop" value={formData.primaryCrop} onChange={(e) => handleChange('primaryCrop', e.target.value)}
              options={[
                { label: 'Paddy (Dhan)', value: 'Paddy (Dhan)' },
                { label: 'Wheat (Gehun)', value: 'Wheat (Gehun)' },
                { label: 'Maize (Makka)', value: 'Maize (Makka)' },
                { label: 'Cotton (Kapas)', value: 'Cotton (Kapas)' },
                { label: 'Pulses (Dal)', value: 'Pulses (Dal)' },
              ]} required />
          </div>
        </div>

        {/* Section 3: Bank Details */}
        <div className="space-y-4 pt-2">
          <div className="pb-2 border-b border-slate-200">
            <h2 className="text-sm font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Bank Details (For Direct Benefit Transfer - DBT)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Account Holder Name" placeholder="Name as per Bank Passbook" value={formData.accountHolderName} onChange={(e) => handleChange('accountHolderName', e.target.value)} required />
            <Input label="Bank Account Number" placeholder="Enter bank account number" value={formData.accountNumber} onChange={(e) => handleChange('accountNumber', e.target.value.replace(/\D/g, ''))} required />
            <Input label="IFSC Code" placeholder="e.g. SBIN0001234" value={formData.ifscCode} onChange={(e) => handleChange('ifscCode', e.target.value.toUpperCase())} required />
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 border-t border-slate-200 flex flex-col-reverse sm:flex-row gap-3">
          <SecondaryButton type="button" onClick={() => navigate('/login/farmer')} className="sm:w-1/3 py-3">Cancel</SecondaryButton>
          <PrimaryButton type="submit" className="sm:w-2/3 py-3 text-base">Register</PrimaryButton>
        </div>
      </form>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">OTP Verification</h3>
                  <p className="text-xs text-slate-500">Verification code sent to +91 {formData.mobile}</p>
                </div>
              </div>
              <button type="button" onClick={() => setShowOtpModal(false)} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {otpError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl">{otpError}</div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block cursor-default">Enter 6-Digit OTP</label>
              <input
                type="text"
                maxLength={6}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit OTP"
                className="w-full text-center tracking-widest text-lg font-bold bg-white border border-slate-300 rounded-xl py-3 text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none select-text cursor-text"
              />
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
                <span>Demo OTP Code: <b>{generatedOtp}</b></span>
                <span className="text-[10px] bg-emerald-200 font-bold px-2 py-0.5 rounded text-emerald-900">Auto-filled</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <SecondaryButton type="button" onClick={() => setShowOtpModal(false)} className="w-1/3">Cancel</SecondaryButton>
              <PrimaryButton type="button" onClick={handleVerifyOtpAndSave} disabled={isSubmitting} className="w-2/3 py-2.5">
                {isSubmitting ? 'Verifying...' : 'Verify & Complete Registration'}
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
