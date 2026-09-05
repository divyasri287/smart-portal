import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Save, UserCheck, ShieldCheck, ArrowRight, Building2, Landmark, User } from 'lucide-react';
import { adminProfile } from '../../data/adminData';

export const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(adminProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [saveNotification, setSaveNotification] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3500);
  };

  return (
    <div className="space-y-7">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <button onClick={() => navigate('/admin/users')} className="hover:text-[#166534]">
              Users
            </button>
            <span>/</span>
            <span className="text-[#166534] font-bold">Admin Profile</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Government Admin Profile & Governance Credentials</h1>
          <p className="text-sm text-slate-500 mt-1">
            Official government officer profile, contact information, and state authorization parameters
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/dashboard')}
          className="shrink-0 flex items-center gap-2 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
        >
          Control Dashboard <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Save Notification Toast */}
      {saveNotification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#166534] flex items-center gap-3 text-sm font-semibold animate-fadeIn shadow-2xs">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Profile information updated successfully! Changes saved to state directory.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#166534] text-white flex items-center justify-center text-3xl font-bold font-mono shadow-md border-4 border-[#F8FAFC]">
              GA
            </div>
            <div>
              <h2 className="font-bold text-xl text-[#111827]">{profile.name}</h2>
              <p className="text-sm font-semibold text-[#15803D] mt-0.5">{profile.role}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{profile.department}</p>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] text-xs space-y-2.5 text-left font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-sans">Role Privilege:</span>
                <span className="font-bold text-[#166534] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {profile.role}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-sans">Total Managed:</span>
                <span className="font-bold text-[#111827]">{profile.totalManagedCentres} Centres</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-sans">Authorized Budget:</span>
                <span className="font-bold text-[#15803D]">{profile.authorizedBudget}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <h3 className="font-bold text-lg text-[#111827]">Government Officer Information</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Update officer details, official email, phone, role, and department designation
                </p>
              </div>

              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-white hover:bg-[#166534]/5 text-[#166534] border border-[#166534]/30 font-semibold rounded-xl px-4 py-2 text-sm transition-colors shadow-2xs"
                >
                  Edit Profile
                </button>
              ) : (
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  Editing Mode Active
                </span>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#111827] mb-1">Official Name</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] disabled:bg-[#F8FAFC] disabled:text-slate-600 focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#111827] mb-1">Official Email</label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] disabled:bg-[#F8FAFC] disabled:text-slate-600 focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#111827] mb-1">Contact Phone</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] disabled:bg-[#F8FAFC] disabled:text-slate-600 focus:ring-2 focus:ring-[#15803D] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#111827] mb-1">Official Role</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] disabled:bg-[#F8FAFC] disabled:text-slate-600 focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Government Department</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] disabled:bg-[#F8FAFC] disabled:text-slate-600 focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                />
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-white hover:bg-slate-50 text-[#15803D] border border-[#15803D] font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#166534] hover:bg-[#14532d] text-white font-semibold rounded-xl px-5 py-2.5 text-sm shadow-xs flex items-center gap-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Profile
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

