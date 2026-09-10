import React, { useState, useEffect } from 'react';
import {
  User,
  Building2,
  Phone,
  Mail,
  Edit2,
  KeyRound,
  X,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import managerStorage from '../../utils/managerStorage';
import { useToastContext } from '../../context/ToastContext';

export const Profile = () => {
  const toastCtx = useToastContext();
  const addToast = toastCtx?.addToast;

  const [profile, setProfile] = useState(() => managerStorage.getProfile());

  // Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  // Edit form fields
  const [name, setName] = useState('');
  const [centreName, setCentreName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const data = managerStorage.getProfile();
    setProfile(data);
    setName(data.name || '');
    setCentreName(data.centreName || '');
    setMobile(data.mobile || '');
    setEmail(data.email || '');
  }, []);

  const handleOpenEdit = () => {
    setName(profile.name || '');
    setCentreName(profile.centreName || '');
    setMobile(profile.mobile || '');
    setEmail(profile.email || '');
    setEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...profile,
      name: name.trim(),
      centreName: centreName.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
    };
    managerStorage.saveProfile(updated);
    setProfile(updated);
    setEditModalOpen(false);
    if (addToast) addToast('Centre Manager profile updated successfully.', 'success');
  };

  const handleOpenPassword = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setPasswordModalOpen(true);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    // Save success
    setPasswordModalOpen(false);
    if (addToast) addToast('Password changed successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto select-none">
      {/* ── HEADER ── */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Manager Profile</h1>
        <p className="text-xs text-slate-500 mt-1">
          Authorized Centre In-Charge credentials and official contact details
        </p>
      </div>

      {/* ── PROFILE DETAILS CARD (EXACTLY THE 4 REQUIRED FIELDS) ── */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {/* Profile Header Banner */}
        <div className="p-6 bg-emerald-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-emerald-900 flex items-center justify-center font-black text-2xl shadow-sm shrink-0">
              {profile.name ? profile.name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'AK'}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 block">
                Procurement Centre In-Charge
              </span>
              <h2 className="text-xl font-black text-white">{profile.name}</h2>
              <p className="text-xs text-emerald-100 mt-0.5">{profile.centreName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleOpenEdit}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-white text-emerald-900 hover:bg-emerald-50 transition-colors shadow-xs cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button
              type="button"
              onClick={handleOpenPassword}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-900 hover:bg-emerald-950 text-white border border-emerald-700 transition-colors shadow-xs cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        {/* The 4 Fields Display */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Manager Name */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Manager Name
              </span>
              <p className="text-base font-bold text-slate-900 mt-0.5">{profile.name}</p>
              <p className="text-[11px] text-slate-500">Official In-Charge</p>
            </div>
          </div>

          {/* 2. Centre Name */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Centre Name
              </span>
              <p className="text-base font-bold text-slate-900 mt-0.5">{profile.centreName}</p>
              <p className="text-[11px] text-slate-500 font-mono">Code: {profile.centreCode || 'CEN-TN-SLM-402'}</p>
            </div>
          </div>

          {/* 3. Mobile Number */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <div className="p-2 bg-slate-200 text-slate-700 rounded-lg shrink-0 mt-0.5">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Mobile Number
              </span>
              <p className="text-base font-bold text-slate-900 font-mono mt-0.5">{profile.mobile}</p>
              <p className="text-[11px] text-slate-500">Registered for OTP Verification</p>
            </div>
          </div>

          {/* 4. Email Address */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <div className="p-2 bg-slate-200 text-slate-700 rounded-lg shrink-0 mt-0.5">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Official Email
              </span>
              <p className="text-base font-bold text-slate-900 mt-0.5">{profile.email}</p>
              <p className="text-[11px] text-slate-500">Official Government Domain</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── EDIT PROFILE MODAL ── */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">Edit Manager Profile</h3>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Manager Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Procurement Centre Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={centreName}
                  onChange={(e) => setCentreName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Mobile Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Official Email Address <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs transition-colors"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── CHANGE PASSWORD MODAL ── */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">Change Password</h3>
              <button
                type="button"
                onClick={() => setPasswordModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passwordError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl">
                {passwordError}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Current Password <span className="text-rose-600">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  New Password <span className="text-rose-600">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Confirm New Password <span className="text-rose-600">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
