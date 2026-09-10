import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  Edit,
  KeyRound,
  CheckCircle2,
  X,
  Save,
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

  const [passForm, setPassForm] = useState({
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
    if (passForm.newPassword !== passForm.confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    showToast('Password changed successfully.');
    setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordModal(false);
  };

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      {/* ── HEADER (SUBTITLE REMOVED) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Profile</h1>

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
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors shadow-2xs cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-slate-500" />
            <span>Change Password</span>
          </button>
        </div>
      </div>

      {/* ── TOAST NOTICE ── */}
      {notice && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-300 text-green-900 flex items-center gap-3 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── PROFILE DETAILS ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-5 max-w-2xl">
        <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
          <div className="w-14 h-14 rounded-full bg-green-800 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            SV
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{profile.adminName}</h2>
            <p className="text-xs text-green-700 font-semibold mt-0.5">National Level Government Administrator</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Admin Name</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{profile.adminName}</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Department</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{profile.department}</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Official Email</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-700" />
              <span>{profile.email}</span>
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mobile Number</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5 font-mono flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-700" />
              <span>{profile.mobileNumber}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── EDIT PROFILE MODAL ── */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-green-800 text-white">
              <h3 className="font-bold text-base">Edit Administrator Profile</h3>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-lg hover:bg-green-700 text-green-100"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  required
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={editForm.mobileNumber}
                  onChange={(e) => setEditForm({ ...editForm, mobileNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:border-green-700"
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
                  className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 text-white font-bold cursor-pointer inline-flex items-center gap-1.5"
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
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-green-800 text-white">
              <h3 className="font-bold text-base">Change Password</h3>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="p-1 rounded-lg hover:bg-green-700 text-green-100"
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
                  value={passForm.currentPassword}
                  onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={passForm.newPassword}
                  onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={passForm.confirmPassword}
                  onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-green-700"
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
                  className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 text-white font-bold cursor-pointer inline-flex items-center gap-1.5"
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
