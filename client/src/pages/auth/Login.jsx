import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToastContext } from '../../context/ToastContext';
import { ROLES } from '../../constants/roles';
import Input from '../../components/inputs/Input';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { ShieldCheck, Tractor, ClipboardCheck, Building2, Landmark, Send } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { roleId } = useParams();
  const { login } = useAuth();
  const toastCtx = useToastContext();
  const addToast = toastCtx?.addToast;

  const activeRole = (roleId || ROLES.FARMER).toLowerCase();

  // Farmer OTP state
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);

  // Staff ID + Password state
  const [idInput, setIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setErrorMsg('');
    setIdInput('');
    setPasswordInput('');
    setMobileNumber('');
    setOtpSent(false);
    setOtpCode('');
  }, [activeRole]);

  // Farmer Send OTP
  const handleSendOtp = () => {
    setErrorMsg('');
    const cleanMobile = mobileNumber.trim();
    if (!cleanMobile || !/^[6-9]\d{9}$/.test(cleanMobile)) {
      setErrorMsg('Please enter a valid 10-digit registered Indian mobile number.');
      return;
    }
    setSendingOtp(true);
    setTimeout(() => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setSimulatedOtp(otp);
      setOtpCode(otp); // Auto-fills OTP for smooth testing
      setOtpSent(true);
      setSendingOtp(false);
      if (addToast) addToast(`OTP sent to +91 ${cleanMobile}`, 'success');
    }, 400);
  };

  // Farmer Login
  const handleFarmerLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!mobileNumber || !/^[6-9]\d{9}$/.test(mobileNumber)) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!otpSent) {
      setErrorMsg('Please click "Send OTP" first to receive your verification code.');
      return;
    }
    if (!otpCode || otpCode.trim().length < 4) {
      setErrorMsg('Please enter the verification OTP code.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = login(ROLES.FARMER, mobileNumber.trim());
      setIsSubmitting(false);
      if (res && res.success) {
        if (addToast) addToast('Welcome back! Logged in successfully.', 'success');
        navigate('/farmer/dashboard');
      } else {
        setErrorMsg((res && res.message) || 'Login failed. Please check your mobile number.');
      }
    }, 300);
  };

  // Staff Login (Officer / Manager / Admin)
  const handleStaffLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!idInput.trim()) {
      setErrorMsg(`Please enter your Employee ID.`);
      return;
    }
    if (!passwordInput.trim()) {
      setErrorMsg('Please enter your Password.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = login(activeRole, idInput.trim(), passwordInput.trim());
      setIsSubmitting(false);
      if (res && res.success) {
        if (addToast) addToast('Authentication successful!', 'success');
        switch (activeRole) {
          case ROLES.OFFICER:
            navigate('/officer/dashboard');
            break;
          case ROLES.MANAGER:
            navigate('/manager/dashboard');
            break;
          case ROLES.ADMIN:
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/select-role');
        }
      } else {
        setErrorMsg((res && res.message) || 'Invalid Employee ID or Password.');
      }
    }, 300);
  };

  return (
    <div className="space-y-5 max-w-lg mx-auto select-none cursor-default">
      {/* Role Banner Header */}
      {activeRole === ROLES.FARMER && (
        <div className="bg-emerald-800 text-white p-5 rounded-2xl shadow-sm border border-emerald-700 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Farmer / Annadata Login</h1>
            <p className="text-xs text-emerald-100 mt-0.5">Secure OTP Login via Registered Mobile</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <Tractor className="w-8 h-8 text-white" />
          </div>
        </div>
      )}

      {activeRole === ROLES.OFFICER && (
        <div className="bg-emerald-800 text-white p-5 rounded-2xl shadow-sm border border-emerald-700 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Procurement Officer Login</h1>
            <p className="text-xs text-emerald-100 mt-0.5">Sign in with Officer ID &amp; Password</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <ClipboardCheck className="w-8 h-8 text-white" />
          </div>
        </div>
      )}

      {activeRole === ROLES.MANAGER && (
        <div className="bg-emerald-900 text-white p-5 rounded-2xl shadow-sm border border-emerald-800 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Centre Manager Login</h1>
            <p className="text-xs text-emerald-100 mt-0.5">Sign in with Manager ID &amp; Password</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <Building2 className="w-8 h-8 text-white" />
          </div>
        </div>
      )}

      {activeRole === ROLES.ADMIN && (
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm border border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Government Admin Login</h1>
            <p className="text-xs text-slate-300 mt-0.5">Sign in with Admin ID &amp; Password</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <Landmark className="w-8 h-8 text-white" />
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ── FARMER LOGIN FORM ── */}
      {activeRole === ROLES.FARMER && (
        <form onSubmit={handleFarmerLogin} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block cursor-default">
              Mobile Number <span className="text-rose-600">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-semibold text-sm">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl pl-12 pr-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 select-text cursor-text"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendingOtp || mobileNumber.length !== 10}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0 cursor-pointer select-none"
              >
                {sendingOtp ? <span>Sending...</span> : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{otpSent ? 'Resend OTP' : 'Send OTP'}</span>
                  </>
                )}
              </button>
            </div>
            <span className="text-[11px] text-slate-500 block cursor-default">OTP will be sent via SMS to this mobile number</span>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block cursor-default">
              OTP <span className="text-rose-600">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter OTP code"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              required
            />
          </div>

          <div className="pt-2">
            <PrimaryButton type="submit" disabled={isSubmitting} className="w-full py-3 text-sm">
              {isSubmitting ? 'Verifying Login...' : 'Verify & Login'}
            </PrimaryButton>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link to="/register/farmer" className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline cursor-pointer">
              New Farmer? Register Here
            </Link>
            <Link to="/select-role" className="text-slate-500 hover:text-slate-800 font-medium cursor-pointer">
              Switch Role
            </Link>
          </div>
        </form>
      )}

      {/* ── STAFF LOGIN FORM (OFFICER / MANAGER / ADMIN) ── */}
      {activeRole !== ROLES.FARMER && (
        <form onSubmit={handleStaffLogin} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <Input
            label={activeRole === ROLES.OFFICER ? 'Officer ID' : activeRole === ROLES.MANAGER ? 'Manager ID' : 'Admin ID'}
            placeholder={`Enter your ID`}
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />

          <div className="flex items-center justify-between pt-1 text-xs">
            <Link to="/select-role" className="text-slate-500 hover:text-slate-800 font-medium cursor-pointer">
              Switch Role
            </Link>
            <Link to="/forgot-password" className="text-emerald-700 font-semibold hover:underline cursor-pointer">
              Forgot Password?
            </Link>
          </div>

          <div className="pt-2">
            <PrimaryButton type="submit" disabled={isSubmitting} className="w-full py-3 text-sm">
              {isSubmitting ? 'Authenticating...' : 'Login'}
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
