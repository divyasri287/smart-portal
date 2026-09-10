import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Building,
  ShieldCheck,
  Edit3,
  X,
  CheckCircle2,
  Clock,
  UserX,
} from 'lucide-react';
import managerStorage from '../../utils/managerStorage';
import { useToastContext } from '../../context/ToastContext';

const COUNTER_OPTIONS = [
  'Counter 1 (Gate & Token Verification)',
  'Counter 2 (Quality & Moisture Inspection)',
  'Counter 3 (Digital Weighbridge Scale)',
  'Counter 4 (Procurement Receipt & DBT)',
  'Counter 5 (Gunny Bag Storage & Loading)',
  'Relief / Mobile Counter',
];

export const OfficerManagement = () => {
  const toastCtx = useToastContext();
  const addToast = toastCtx?.addToast;

  const [officers, setOfficers] = useState(() => managerStorage.getOfficers());

  // Modal States
  const [counterModalOpen, setCounterModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  const [newCounter, setNewCounter] = useState('');
  const [newStatus, setNewStatus] = useState('Available');

  useEffect(() => {
    setOfficers(managerStorage.getOfficers());
  }, []);

  const openCounterModal = (officer) => {
    setSelectedOfficer(officer);
    setNewCounter(officer.assignedCounter);
    setCounterModalOpen(true);
  };

  const handleSaveCounter = (e) => {
    e.preventDefault();
    if (!selectedOfficer) return;
    const updated = managerStorage.assignOfficerCounter(selectedOfficer.id, newCounter);
    setOfficers(updated);
    setCounterModalOpen(false);
    if (addToast) addToast(`Counter assigned to ${selectedOfficer.officerName}.`, 'success');
  };

  const openStatusModal = (officer) => {
    setSelectedOfficer(officer);
    setNewStatus(officer.status);
    setStatusModalOpen(true);
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (!selectedOfficer) return;
    const updated = managerStorage.updateOfficerStatus(selectedOfficer.id, newStatus);
    setOfficers(updated);
    setStatusModalOpen(false);
    if (addToast) addToast(`Status updated to "${newStatus}" for ${selectedOfficer.officerName}.`, 'info');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none">
      {/* ── HEADER ── */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Officer Management</h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor on-duty procurement officers, counter stations, and duty status
        </p>
      </div>

      {/* ── OFFICER LIST TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Centre Officers List ({officers.length} Registered Officers)
          </h2>
          <span className="text-xs text-slate-500">
            Available: <strong className="text-emerald-700">{officers.filter(o => o.status === 'Available').length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Officer Name</th>
                <th className="px-5 py-3.5">Assigned Counter</th>
                <th className="px-5 py-3.5">Current Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {officers.map((officer) => {
                return (
                  <tr key={officer.id} className="hover:bg-slate-50 transition-colors">
                    {/* 1. Officer Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs shrink-0">
                          {officer.officerName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{officer.officerName}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{officer.badgeNo}</p>
                        </div>
                      </div>
                    </td>

                    {/* 2. Assigned Counter */}
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-800 text-sm block">
                        {officer.assignedCounter}
                      </span>
                    </td>

                    {/* 3. Current Status (Available / Busy / On Leave) */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          officer.status === 'Available'
                            ? 'bg-emerald-100 text-emerald-800'
                            : officer.status === 'Busy'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            officer.status === 'Available'
                              ? 'bg-emerald-600'
                              : officer.status === 'Busy'
                              ? 'bg-amber-600 animate-pulse'
                              : 'bg-slate-400'
                          }`}
                        />
                        {officer.status}
                      </span>
                    </td>

                    {/* Buttons: Assign Counter & Update Status */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openCounterModal(officer)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                        >
                          <Building className="w-3.5 h-3.5" />
                          <span>Assign Counter</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openStatusModal(officer)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Update Status</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ASSIGN COUNTER MODAL ── */}
      {counterModalOpen && selectedOfficer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Station Assignment
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Assign Counter
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCounterModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCounter} className="space-y-4 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Officer:</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {selectedOfficer.officerName} ({selectedOfficer.badgeNo})
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Select Counter Station <span className="text-rose-600">*</span>
                </label>
                <select
                  value={newCounter}
                  onChange={(e) => setNewCounter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                >
                  {COUNTER_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCounterModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs transition-colors"
                >
                  Save Counter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── UPDATE STATUS MODAL ── */}
      {statusModalOpen && selectedOfficer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Duty Status
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Update Officer Status
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStatusModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-4 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Officer:</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {selectedOfficer.officerName} ({selectedOfficer.badgeNo})
                </p>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Select Duty Status <span className="text-rose-600">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    { val: 'Available', label: 'Available (Active on counter)', color: 'border-emerald-500 text-emerald-800 bg-emerald-50' },
                    { val: 'Busy', label: 'Busy (Conducting inspection / verification)', color: 'border-amber-500 text-amber-800 bg-amber-50' },
                    { val: 'On Leave', label: 'On Leave (Off-duty / authorized absence)', color: 'border-slate-400 text-slate-700 bg-slate-50' },
                  ].map((s) => (
                    <label
                      key={s.val}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        newStatus === s.val
                          ? `${s.color} font-bold shadow-xs`
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="officerStatus"
                        value={s.val}
                        checked={newStatus === s.val}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="text-emerald-800 focus:ring-emerald-700"
                      />
                      <span className="text-xs">{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStatusModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs transition-colors"
                >
                  Confirm Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficerManagement;
