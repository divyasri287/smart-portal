import React, { useState } from 'react';
import { managerProfileData } from '../../data/manager/profile';
import { User, Building, ShieldCheck, Mail, Phone, Save, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Profile = () => {
  const [managerInfo, setManagerInfo] = useState({
    name: managerProfileData.name,
    designation: managerProfileData.designation,
    email: managerProfileData.email,
    phone: managerProfileData.phone,
    mandiCode: managerProfileData.mandiCode,
    mandiName: managerProfileData.mandiName,
    district: managerProfileData.district,
    state: managerProfileData.state,
    dailyCapacityTons: managerProfileData.dailyCapacityTons,
    operatingHours: managerProfileData.operatingHours,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const initials = managerInfo.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 font-['Inter']">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#166534] to-[#15803D] text-white p-6 sm:p-8 rounded-[18px] shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F59E0B] text-slate-950 font-bold font-['Poppins'] text-2xl flex items-center justify-center border-2 border-white shadow-sm">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-['Poppins'] text-white">{managerInfo.name}</h1>
                <span className="bg-[#F59E0B] text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase font-['Poppins']">
                  {managerProfileData.securityLevel}
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-['Inter'] mt-0.5">
                {managerInfo.designation} • {managerInfo.mandiName}
              </p>
              <div className="flex items-center gap-4 text-xs font-['Roboto_Mono'] text-amber-200 mt-2">
                <span>Code: {managerInfo.mandiCode}</span>
                <span>•</span>
                <span>District: {managerInfo.district}, {managerInfo.state}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-xl text-xs text-emerald-100 font-['Inter']">
            <p className="font-semibold text-white font-['Poppins']">System Security Standard</p>
            <p className="text-[11px] text-emerald-200">{managerProfileData.aadhaarStatus}</p>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-[#166534] text-xs font-semibold font-['Poppins'] flex items-center gap-2 shadow-xs"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Centre Manager details updated successfully!</span>
        </motion.div>
      )}

      {/* Main Profile & Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-['Inter']">
        {/* Left Column: Manager Profile Form */}
        <div className="lg:col-span-2 bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs p-6">
          <h2 className="text-base font-bold font-['Poppins'] text-[#111827] mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <User className="w-5 h-5 text-[#166534]" />
            Personal &amp; Official Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-['Inter']">
                  Full Officer Name
                </label>
                <input
                  type="text"
                  value={managerInfo.name}
                  onChange={(e) => setManagerInfo({ ...managerInfo, name: e.target.value })}
                  className="w-full h-11 px-4 text-xs bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl focus:bg-white focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-['Inter']">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={managerInfo.designation}
                  readOnly
                  className="w-full h-11 px-4 text-xs bg-slate-100 border border-[#E5E7EB] text-slate-500 rounded-xl cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-['Inter']">
                  Govt Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={managerInfo.email}
                    onChange={(e) => setManagerInfo({ ...managerInfo, email: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 text-xs bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl focus:bg-white focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20 font-['Roboto_Mono']"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-['Inter']">
                  Official Phone Contact
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={managerInfo.phone}
                    onChange={(e) => setManagerInfo({ ...managerInfo, phone: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 text-xs bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl focus:bg-white focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20 font-['Roboto_Mono']"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold font-['Poppins'] text-[#111827] mb-3 flex items-center gap-2">
                <Building className="w-4 h-4 text-[#166534]" />
                Assigned Mandi Parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 font-['Inter']">
                    Mandi Centre Name
                  </label>
                  <input
                    type="text"
                    value={managerInfo.mandiName}
                    readOnly
                    className="w-full h-11 px-4 text-xs bg-slate-100 border border-[#E5E7EB] text-slate-500 rounded-xl cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 font-['Inter']">
                    Daily Grain Tonnage Limit (MT)
                  </label>
                  <input
                    type="number"
                    value={managerInfo.dailyCapacityTons}
                    onChange={(e) => setManagerInfo({ ...managerInfo, dailyCapacityTons: e.target.value })}
                    className="w-full h-11 px-4 text-xs font-['Roboto_Mono'] bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl focus:bg-white focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="h-11 px-6 bg-[#166534] hover:bg-[#14532d] text-white font-semibold text-xs font-['Poppins'] rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Mandi Meta & Security */}
        <div className="space-y-6">
          <div className="bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs p-6">
            <h2 className="text-base font-bold font-['Poppins'] text-[#111827] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#166534]" />
              Mandi Infrastructure
            </h2>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center justify-between">
                <span className="text-slate-600 font-['Inter']">Active Weighbridges</span>
                <span className="font-bold text-slate-900 font-['Roboto_Mono']">
                  {managerProfileData.infrastructure.weighbridges}
                </span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center justify-between">
                <span className="text-slate-600 font-['Inter']">Moisture Testing Labs</span>
                <span className="font-bold text-slate-900 font-['Roboto_Mono']">
                  {managerProfileData.infrastructure.testingLabs}
                </span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center justify-between">
                <span className="text-slate-600 font-['Inter']">Storage Silo Capacity</span>
                <span className="font-bold text-[#166534] font-['Roboto_Mono']">
                  {managerProfileData.infrastructure.siloCapacity}
                </span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center justify-between">
                <span className="text-slate-600 font-['Inter']">PFMS Disbursement Sync</span>
                <span className="font-bold text-emerald-700 font-['Poppins'] flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> {managerProfileData.infrastructure.pfmsSync}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs p-6">
            <h2 className="text-base font-bold font-['Poppins'] text-[#111827] mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#F59E0B]" />
              Security Settings
            </h2>
            <p className="text-xs text-slate-500 mb-4 font-['Inter']">
              Password changes require NIC OTP verification sent to registered phone.
            </p>
            <button
              onClick={() => alert(`Password reset link dispatched to ${managerInfo.email}`)}
              className="w-full h-11 bg-white hover:bg-amber-50 text-amber-900 border border-[#F59E0B] text-xs font-semibold font-['Poppins'] rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#F59E0B]" />
              <span>Reset Portal Password</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
