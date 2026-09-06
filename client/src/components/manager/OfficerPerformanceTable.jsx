import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, RefreshCw, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const OfficerPerformanceTable = ({ officersData = [], onAssignOfficer }) => {
  const [search, setSearch] = useState('');
  const [shiftFilter, setShiftFilter] = useState('All');
  const [reassignOfficer, setReassignOfficer] = useState(null);
  const [selectedBay, setSelectedBay] = useState('Weighbridge Bay 1');

  const defaultOfficers = officersData.length > 0 ? officersData : [
    { id: 'OFF-101', name: 'Balwinder Singh', badge: 'INS-PB-401', bay: 'Gate 1 Intake', shift: 'Morning (08:00 - 14:00)', status: 'On Duty', rating: 4.9, verifiedCount: 142 },
    { id: 'OFF-102', name: 'Harpreet Kaur', badge: 'INS-PB-402', bay: 'Weighbridge Bay 2', shift: 'Morning (08:00 - 14:00)', status: 'On Duty', rating: 4.8, verifiedCount: 128 },
    { id: 'OFF-103', name: 'Rajinder Sharma', badge: 'INS-PB-403', bay: 'Moisture Testing Lab 1', shift: 'Morning (08:00 - 14:00)', status: 'On Break', rating: 4.6, verifiedCount: 96 },
    { id: 'OFF-104', name: 'Gurmeet Dhillon', badge: 'INS-PB-404', bay: 'Unloading Yard B', shift: 'Evening (14:00 - 20:00)', status: 'Off Duty', rating: 4.9, verifiedCount: 164 },
    { id: 'OFF-105', name: 'Sandeep Verma', badge: 'INS-PB-405', bay: 'Exit Dispatch Gate', shift: 'Evening (14:00 - 20:00)', status: 'On Duty', rating: 4.7, verifiedCount: 110 },
  ];

  const filteredOfficers = defaultOfficers.filter((o) => {
    const matchesSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.badge.toLowerCase().includes(search.toLowerCase());
    const matchesShift = shiftFilter === 'All' || o.shift.startsWith(shiftFilter);
    return matchesSearch && matchesShift;
  });

  const handleReassignSubmit = (e) => {
    e.preventDefault();
    if (onAssignOfficer) onAssignOfficer(reassignOfficer.id, selectedBay);
    setReassignOfficer(null);
  };

  return (
    <div className="bg-white rounded-[18px] border border-[#E5E7EB] shadow-xs overflow-hidden font-['Inter']">
      {/* Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E5E7EB] bg-[#F8FAFC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search inspector by name or badge ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 text-xs bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
            className="h-11 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-slate-700 font-['Poppins'] focus:outline-none focus:border-[#166534]"
          >
            <option value="All">All Shifts</option>
            <option value="Morning">Morning Shift</option>
            <option value="Evening">Evening Shift</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 border-b border-[#E5E7EB] text-[11px] font-bold text-slate-600 uppercase tracking-wider font-['Poppins']">
              <th className="py-3.5 px-4">Inspector Details</th>
              <th className="py-3.5 px-4">Duty Bay Assignment</th>
              <th className="py-3.5 px-4">Shift Schedule</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Performance Rating</th>
              <th className="py-3.5 px-4 text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-['Inter']">
            {filteredOfficers.map((officer) => (
              <tr key={officer.id} className="hover:bg-emerald-50/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#166534] font-bold flex items-center justify-center text-xs font-['Poppins']">
                      {officer.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-[#111827] font-['Poppins']">{officer.name}</p>
                      <p className="text-[11px] text-slate-500 font-['Roboto_Mono']">{officer.badge}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 font-medium text-slate-800">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC] text-slate-800 border border-[#E5E7EB]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#166534]" />
                    {officer.bay}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span className="text-slate-600 font-['Roboto_Mono'] text-[11px]">
                    {officer.shift}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-['Roboto_Mono'] ${
                      officer.status === 'On Duty'
                        ? 'bg-emerald-100 text-[#166534]'
                        : officer.status === 'On Break'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {officer.status}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="font-bold font-['Roboto_Mono'] text-slate-900">{officer.rating}</span>
                    <span className="text-[10px] text-slate-400 font-['Roboto_Mono']">({officer.verifiedCount} inspections)</span>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setReassignOfficer(officer)}
                    className="h-9 px-3.5 rounded-lg bg-white border border-[#166534] text-[#166534] hover:bg-[#166534] hover:text-white font-semibold text-xs font-['Poppins'] transition-all inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reassign</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reassign Duty Modal */}
      {reassignOfficer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[18px] p-6 max-w-md w-full border border-[#E5E7EB] shadow-2xl space-y-4 font-['Inter']"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-['Poppins'] font-bold text-base text-[#111827]">
                  Reassign Officer Duty
                </h3>
                <p className="text-xs text-slate-500">{reassignOfficer.name} ({reassignOfficer.badge})</p>
              </div>
              <button
                onClick={() => setReassignOfficer(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReassignSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select New Mandi Station / Bay
                </label>
                <select
                  value={selectedBay}
                  onChange={(e) => setSelectedBay(e.target.value)}
                  className="w-full h-11 px-3 text-xs bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#166534]"
                >
                  <option value="Gate 1 Intake">Gate 1 Intake</option>
                  <option value="Gate 2 Intake">Gate 2 Intake</option>
                  <option value="Weighbridge Bay 1">Weighbridge Bay 1</option>
                  <option value="Weighbridge Bay 2">Weighbridge Bay 2</option>
                  <option value="Moisture Testing Lab 1">Moisture Testing Lab 1</option>
                  <option value="Unloading Yard A">Unloading Yard A</option>
                  <option value="Exit Dispatch Gate">Exit Dispatch Gate</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReassignOfficer(null)}
                  className="h-11 px-5 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-slate-600 hover:bg-slate-50 font-['Poppins']"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 px-5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-semibold font-['Poppins'] shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Reassignment</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OfficerPerformanceTable;
