import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  CalendarCheck,
  Clock,
  CheckCircle2,
  UserCheck,
  Scale,
  ListOrdered,
  CalendarClock,
  DoorOpen,
  DoorClosed,
  AlertCircle,
} from 'lucide-react';
import managerStorage from '../../utils/managerStorage';
import { useToastContext } from '../../context/ToastContext';

export const ManagerDashboard = () => {
  const navigate = useNavigate();
  const toastCtx = useToastContext();
  const addToast = toastCtx?.addToast;

  const [centreStatus, setCentreStatus] = useState(() => managerStorage.getCentreStatus());
  const [profile, setProfile] = useState(() => managerStorage.getProfile());
  const [slots, setSlots] = useState(() => managerStorage.getSlots());
  const [queue, setQueue] = useState(() => managerStorage.getQueue());
  const [officers, setOfficers] = useState(() => managerStorage.getOfficers());
  const [reports, setReports] = useState(() => managerStorage.getReports());

  const loadData = () => {
    setCentreStatus(managerStorage.getCentreStatus());
    setProfile(managerStorage.getProfile());
    setSlots(managerStorage.getSlots());
    setQueue(managerStorage.getQueue());
    setOfficers(managerStorage.getOfficers());
    setReports(managerStorage.getReports());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute metrics
  const totalBookings =
    slots.reduce((sum, s) => sum + (Number(s.bookedCount) || 0), 0) ||
    reports?.today?.totalBookings ||
    147;

  const waitingFarmers = queue.filter((q) => q.status === 'Waiting').length || 3;
  const completedFarmers = queue.filter((q) => q.status === 'Completed').length || 2;
  const availableOfficers = officers.filter((o) => o.status === 'Available').length;
  const totalOfficers = officers.length;
  const todayQuantity = reports?.today?.totalQuantityQtl
    ? `${reports.today.totalQuantityQtl.toLocaleString('en-IN')} Qtl`
    : '3,420.50 Qtl';

  // Quick Actions
  const handleOpenCentre = () => {
    managerStorage.setCentreStatus('Open');
    setCentreStatus('Open');
    if (addToast) addToast('Procurement Centre is now OPEN for operations.', 'success');
  };

  const handleCloseCentre = () => {
    managerStorage.setCentreStatus('Closed');
    setCentreStatus('Closed');
    if (addToast) addToast('Procurement Centre has been CLOSED.', 'info');
  };

  return (
    <div className="space-y-4 select-none cursor-default">
      {/* ── A. MANDI WORKSTATION HEADER (EXACTLY MATCHING OFFICER MODULE) ── */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white rounded-xl p-4 sm:p-4.5 shadow-xs border border-emerald-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-bold text-white tracking-tight">
                {profile.centreName || 'Salem Main Procurement Centre #402'}
              </h1>
              <span className="text-[10px] bg-emerald-950/80 text-emerald-200 px-2 py-0.5 rounded-md font-mono border border-emerald-600/40">
                {profile.centreCode || 'CEN-TN-SLM-402'}
              </span>
            </div>
            <p className="text-xs text-emerald-200 flex items-center gap-2 mt-0.5">
              <span className="font-semibold">{profile.name || 'Anil Kumar'}</span>
              <span className="text-emerald-400">·</span>
              <span>Centre Manager In-Charge</span>
              <span className="text-emerald-400">·</span>
              <span>{profile.district || 'Salem'}, {profile.state || 'Tamil Nadu'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-700/50 text-[11px] text-emerald-200 font-mono">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Shift: 08:00 AM – 06:00 PM</span>
          </div>
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold ${
              centreStatus === 'Open'
                ? 'bg-emerald-400/20 border-emerald-300/30 text-emerald-100'
                : 'bg-rose-500/20 border-rose-300/30 text-rose-100'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                centreStatus === 'Open' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
              }`}
            />
            <span>{centreStatus === 'Open' ? 'Centre Open' : 'Centre Closed'}</span>
          </div>
        </div>
      </div>

      {/* ── B. EXACTLY 6 COMPACT KPI STAT CARDS (OFFICER THEME) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {/* 1. Centre Status */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Centre Status
            </span>
            <div
              className={`p-1.5 rounded-lg border ${
                centreStatus === 'Open'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {centreStatus === 'Open' ? <DoorOpen className="w-4 h-4" /> : <DoorClosed className="w-4 h-4" />}
            </div>
          </div>
          <div className="mt-2.5">
            <p
              className={`text-2xl font-bold font-mono leading-none ${
                centreStatus === 'Open' ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {centreStatus}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Operational today</p>
          </div>
        </div>

        {/* 2. Today's Total Bookings */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Today's Bookings
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold text-slate-900 font-mono leading-none">{totalBookings}</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Total slots registered</p>
          </div>
        </div>

        {/* 3. Farmers Waiting */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Farmers Waiting
            </span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold text-amber-700 font-mono leading-none">{waitingFarmers}</p>
            <p className="text-[11px] text-amber-700 font-medium mt-1">In queue for verification</p>
          </div>
        </div>

        {/* 4. Farmers Completed */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Farmers Completed
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold text-emerald-700 font-mono leading-none">{completedFarmers}</p>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">Weighed and receipt issued</p>
          </div>
        </div>

        {/* 5. Officers Available */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Officers Available
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold text-slate-900 font-mono leading-none">
              {availableOfficers} <span className="text-sm font-semibold text-slate-500">/ {totalOfficers} Active</span>
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Assigned across stations</p>
          </div>
        </div>

        {/* 6. Today's Procurement Quantity */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Today's Quantity
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <p className="text-2xl font-bold text-emerald-800 font-mono leading-none">{todayQuantity}</p>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">Digital weighbridge total</p>
          </div>
        </div>
      </div>

      {/* ── C. QUICK ACTIONS (CLEAN & ACCESSIBLE) ── */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Centre Operations &amp; Quick Controls
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Direct Station Actions
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Action 1: Open Centre */}
          <button
            type="button"
            onClick={handleOpenCentre}
            disabled={centreStatus === 'Open'}
            className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
              centreStatus === 'Open'
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer active:scale-98'
            }`}
          >
            <DoorOpen className="w-4 h-4" />
            <span>Open Centre</span>
          </button>

          {/* Action 2: Close Centre */}
          <button
            type="button"
            onClick={handleCloseCentre}
            disabled={centreStatus === 'Closed'}
            className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
              centreStatus === 'Closed'
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                : 'bg-rose-700 hover:bg-rose-800 text-white cursor-pointer active:scale-98'
            }`}
          >
            <DoorClosed className="w-4 h-4" />
            <span>Close Centre</span>
          </button>

          {/* Action 3: View Queue */}
          <button
            type="button"
            onClick={() => navigate('/manager/queue-monitoring')}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-50 transition-all shadow-2xs cursor-pointer active:scale-98"
          >
            <ListOrdered className="w-4 h-4 text-emerald-700" />
            <span>View Queue</span>
          </button>

          {/* Action 4: Manage Slots */}
          <button
            type="button"
            onClick={() => navigate('/manager/slot-management')}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 transition-all shadow-2xs cursor-pointer active:scale-98"
          >
            <CalendarClock className="w-4 h-4 text-slate-600" />
            <span>Manage Slots</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
