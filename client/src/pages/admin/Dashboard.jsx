import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  CreditCard,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Clock,
  Wheat,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import adminStorage from '../../utils/adminStorage';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(() => adminStorage.getDashboardStats());
  const [centres, setCentres] = useState(() => adminStorage.getCentres());
  const [profile, setProfile] = useState(() => adminStorage.getProfile());

  useEffect(() => {
    const sync = () => {
      setStats(adminStorage.getDashboardStats());
      setCentres(adminStorage.getCentres());
      setProfile(adminStorage.getProfile());
    };
    sync();
    const interval = setInterval(sync, 2000);
    return () => clearInterval(interval);
  }, []);

  const summaryCards = [
    {
      title: 'Total Centres',
      value: stats.totalCentres,
      subtitle: 'Registered Mandi Depots',
      icon: Building2,
      color: 'emerald',
      badge: 'National Grid',
    },
    {
      title: 'Centres Open',
      value: stats.centresOpen,
      subtitle: 'Active & Accepting Grain',
      icon: CheckCircle2,
      color: 'green',
      badge: 'Operational',
    },
    {
      title: 'Centres Closed',
      value: stats.centresClosed,
      subtitle: 'Maintenance / Inactive',
      icon: XCircle,
      color: 'rose',
      badge: 'Standby',
    },
    {
      title: "Today's Farmers",
      value: stats.todayFarmers.toLocaleString('en-IN'),
      subtitle: 'Tokens Verified Today',
      icon: Users,
      color: 'blue',
      badge: 'Live Attendance',
    },
    {
      title: "Today's Procurement",
      value: stats.todayProcurement,
      subtitle: 'Paddy, Wheat & Coarse Grain',
      icon: Wheat,
      color: 'amber',
      badge: 'Weighbridge Total',
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      subtitle: 'Awaiting Bank Clearance',
      icon: Clock,
      color: 'amber',
      badge: 'DBT Direct Clearing',
    },
  ];

  const quickActions = [
    {
      title: 'View Centres',
      desc: 'Monitor operational state, open/close bays and live mandi queues',
      icon: Building2,
      link: '/admin/centre-monitoring',
      buttonText: 'Open Centre Master',
      color: 'emerald',
    },
    {
      title: 'Manage Users',
      desc: 'Assign procurement officers and centre managers across depots',
      icon: Users,
      link: '/admin/users',
      buttonText: 'Manage Staff Directory',
      color: 'blue',
    },
    {
      title: 'Payments',
      desc: 'Audit farmer DBT transactions, approve payments & mark paid',
      icon: CreditCard,
      link: '/admin/payments',
      buttonText: 'Audit Payments',
      color: 'amber',
    },
    {
      title: 'Reports',
      desc: 'Download Daily, Weekly and Monthly procurement summaries (PDF)',
      icon: FileSpreadsheet,
      link: '/admin/reports',
      buttonText: 'Generate Reports',
      color: 'slate',
    },
  ];

  return (
    <div className="space-y-6 select-none cursor-default font-sans pb-8">
      {/* ── TOP WORKSTATION HEADER (OFFICER THEME) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              National Directorate
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: {profile.clearance || 'ADM-NAT-01'}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Government Admin Directorate
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {profile.department} · {profile.adminName}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-2 rounded-lg font-medium">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>Season Kharif 2026</span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse ml-1" />
          </div>
        </div>
      </div>

      {/* ── SUMMARY STATS (EXACTLY 6 CARDS REQUIRED BY USER) ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Today's Procurement Summary
          </h2>
          <span className="text-xs text-slate-400">Real-time LocalStorage State</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {summaryCards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {c.badge}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 truncate">{c.title}</p>
                  <p className="text-xl font-extrabold text-slate-900 font-mono mt-1 tracking-tight">
                    {c.value}
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 truncate">{c.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── QUICK ACTIONS (LARGE BUTTONS / CARDS) ── */}
      <div>
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
          Core Admin Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.title}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-emerald-600/60 transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 mb-3 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {action.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {action.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(action.link)}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  <span>{action.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RECENT CENTRES STATUS TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-base text-slate-900">Procurement Centres Overview</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live operational status and vehicle queue count across active Mandis
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/centre-monitoring')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 inline-flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>View All {centres.length} Centres</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Centre Name</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Manager In-Charge</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Today's Queue</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {centres.slice(0, 5).map((centre) => {
                const isOpen = centre.status === 'Open';
                return (
                  <tr key={centre.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{centre.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{centre.district}, {centre.state}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{centre.manager}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ' +
                          (isOpen
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200')
                        }
                      >
                        <span
                          className={
                            'w-1.5 h-1.5 rounded-full ' + (isOpen ? 'bg-emerald-600' : 'bg-rose-600')
                          }
                        />
                        <span>{centre.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {centre.todayQueue} Vehicles
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => navigate('/admin/centre-monitoring')}
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-emerald-50 transition-colors cursor-pointer"
                      >
                        Monitor
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
