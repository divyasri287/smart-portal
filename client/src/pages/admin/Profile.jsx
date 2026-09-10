import React, { useState, useEffect } from 'react';
import {
  User,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  Edit,
  KeyRound,
  CheckCircle2,
  X,
  Save,
  MapPin,
  Calendar,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminProfile = () => {
  const [profile, setProfile] = useState(() => adminStorage.getProfile());
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [notice, setNotice] = useState(null);

  const [editForm, setEditForm] = useState({
    adminName: '',
    department: '',
    email: '',
    mobileNumber: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const p = adminStorage.getProfile();
    setProfile(p);
    setEditForm({
      adminName: p.adminName,
      department: p.department,
      email: p.email,
      mobileNumber: p.mobileNumber,
    });
  }, []);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = adminStorage.updateProfile(editForm);
    setProfile(updated);
    showToast('Administrator profile updated successfully.');
    setShowEditModal(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New password and confirmation do not match!');
      return;
    }
    showToast('Security password changed successfully.');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswordModal(false);
  };

  return (
    <div className="space-y-6 select-none cursor-default font-sans pb-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Administrative Credentials
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Administrator Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Official government directorate identity, verified contact channels, and system security parameters
          </p>
        </div>

        {/* Buttons: Edit Profile & Change Password */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setEditForm({
                adminName: profile.adminName,
                department: profile.department,
                email: profile.email,
                mobileNumber: profile.mobileNumber,
              });
              setShowEditModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors shadow-2xs cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-slate-500" />
            <span>Change Password</span>
          </button>
        </div>
      </div>

      {/* ── TOAST NOTICE ── */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── TOP STATS (MAX 4 CARDS) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Cadre & Service</p>
          <p className="text-lg font-bold text-slate-900 mt-1 font-mono">{profile.cadre}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Indian Administrative Service</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Security Clearance</p>
          <p className="text-lg font-bold text-emerald-800 mt-1 font-mono">{profile.clearance}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Full Central Authorization</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Centres Monitored</p>
          <p className="text-lg font-bold text-slate-900 mt-1 font-mono">250 Mandis</p>
          <p className="text-[11px] text-slate-400 mt-0.5">36 Mandi Districts</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Authentication</p>
          <p className="text-lg font-bold text-slate-900 mt-1 font-mono">OTP + Security Token</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Govt SSO Verified</p>
        </div>
      </div>

      {/* ── PROFILE INFORMATION CARD ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-emerald-800 text-white flex items-center justify-center text-2xl font-bold font-mono shadow-md border-2 border-emerald-200">
            SV
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{profile.adminName}</h2>
            <p className="text-xs font-semibold text-emerald-700 mt-0.5">{profile.designation}</p>
            <p className="text-xs text-slate-500 mt-0.5">{profile.department}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Admin Name
            </p>
            <p className="text-sm font-bold text-slate-900">{profile.adminName}</p>
            <p className="text-[11px] text-slate-500">{profile.cadre}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Department
            </p>
            <p className="text-sm font-bold text-slate-900">{profile.department}</p>
            <p className="text-[11px] text-slate-500">Government of India</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Official Email
            </p>
            <div className="flex items-center gap-2 text-slate-900 font-medium">
              <Mail className="w-4 h-4 text-emerald-700" />
              <span className="text-sm">{profile.email}</span>
            </div>
            <p className="text-[11px] text-slate-400">NIC Official Mail Gateway</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Mobile Number
            </p>
            <div className="flex items-center gap-2 text-slate-900 font-mono font-medium">
              <Phone className="w-4 h-4 text-emerald-700" />
              <span className="text-sm">{profile.mobileNumber}</span>
            </div>
            <p className="text-[11px] text-slate-400">Aadhaar Linked Official Contact</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 md:col-span-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Headquarters Office Address
            </p>
            <div className="flex items-center gap-2 text-slate-900">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-sm font-medium">{profile.office}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── EDIT PROFILE MODAL ── */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-emerald-900 text-white">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-emerald-300" />
                <h3 className="font-bold text-base">Edit Administrator Profile</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Admin Name</label>
                <input
                  type="text"
                  required
                  value={editForm.adminName}
                  onChange={(e) => setEditForm({ ...editForm, adminName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  required
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={editForm.mobileNumber}
                  onChange={(e) => setEditForm({ ...editForm, mobileNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold cursor-pointer hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── CHANGE PASSWORD MODAL ── */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-emerald-900 text-white">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-300" />
                <h3 className="font-bold text-base">Change Access Password</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold cursor-pointer hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
